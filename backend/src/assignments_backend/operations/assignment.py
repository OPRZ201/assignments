from typing import TYPE_CHECKING

from sqlmodel import Session, select

from assignments_backend.database import engine
from assignments_backend.errors import HTTPNotFoundError, InternalServerError
from assignments_backend.models.assignment import Assignment
from assignments_backend.models.group import Group
from assignments_backend.operations.group import get_group
from assignments_backend.schemas.assignment import (
    AssignmentsListRequest,
    AssignmentsListResponse,
    CreateAssignment,
)
from assignments_backend.schemas.pagination import PaginationMeta
from assignments_backend.utils import get_count, order_by

if TYPE_CHECKING:
    import pydantic


async def check_code(
    student_code: str | None = None,
    editor_code: str | None = None,
) -> Group:
    try:
        group = await get_group(
            student_code=student_code,
            editor_code=editor_code,
        )
    except RuntimeError as e:
        raise InternalServerError(
            log_message={
                "error": e,
                "error.args": str(e.args),
            },
        ) from e

    if group is None:
        raise HTTPNotFoundError(detail_override="Group not found")

    return group


async def get_assignments(
    student_code: str,
    query_params: AssignmentsListRequest,
) -> AssignmentsListResponse:
    group = await check_code(
        student_code=student_code,
    )

    with Session(engine) as session:
        query = (
            select(Assignment)
            .where(
                Assignment.group_id == group.id,
            )
            .order_by(
                order_by(
                    model=Assignment,
                    pagination_input=query_params,
                ),
            )
        )

        assignments_count = get_count(session=session, q=query)

        query = query.limit(
            query_params.limit,
        ).offset(
            query_params.offset,
        )

        assignments = session.exec(query).all()
        return AssignmentsListResponse(
            meta=PaginationMeta(
                total=assignments_count,
                offset=query_params.offset,
                limit=query_params.limit,
            ),
            content=list(assignments),
        )


async def get_assignment(
    student_code: str,
    assignment_id: "pydantic.UUID4",
) -> Assignment:
    group = await check_code(
        student_code=student_code,
    )

    with Session(engine) as session:
        query = select(Assignment).where(
            Assignment.id == assignment_id,
            Assignment.group_id == group.id,
        )

        assignment = session.exec(query).first()

        if not assignment:
            raise HTTPNotFoundError(detail_override="Assignment not found")

        return assignment


async def create_assignment(
    editor_code: str,
    assignment: "CreateAssignment",
) -> Assignment:
    group = await check_code(
        editor_code=editor_code,
    )

    with Session(engine) as session:
        assignment = Assignment.model_validate(
            assignment,
            from_attributes=True,
            update={
                "group_id": group.id,
            },
        )

        session.add(assignment)
        session.commit()
        session.refresh(assignment)

        return assignment

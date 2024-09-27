from typing import Annotated

import pydantic
from fastapi import Body
from fastapi.params import Header, Query

from assignments_backend.operations import assignment as assignments_operations
from assignments_backend.schemas.assignment import (
    Assignment,
    AssignmentsListRequest,
    AssignmentsListResponse,
    CreateAssignment,
)

from .router import router


@router.get(
    "/assignments/",
    tags=["Assignments", "Assignments Public"],
)
async def get_assignments(
    student_code: Annotated[str, Header(alias="X-Student-Code")],
    query_params: Annotated[AssignmentsListRequest, Query()],
) -> AssignmentsListResponse:
    return await assignments_operations.get_assignments(
        student_code=student_code,
        query_params=query_params,
    )


@router.get(
    "/assignments/{assignment_id}",
    tags=["Assignments", "Assignments Public"],
)
async def get_assignment(
    student_code: Annotated[str, Header(alias="X-Student-Code")],
    assignment_id: pydantic.UUID4,
) -> Assignment:
    return await assignments_operations.get_assignment(
        student_code=student_code,
        assignment_id=assignment_id,
    )


@router.post(
    "/assignments/",
    tags=["Assignments", "Assignments Management"],
)
async def create_assignment(
    editor_code: Annotated[str, Header(alias="X-Editor-Code")],
    assignment: Annotated[CreateAssignment, Body()],
) -> Assignment:
    return await assignments_operations.create_assignment(
        editor_code=editor_code,
        assignment=assignment,
    )

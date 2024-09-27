from typing import TYPE_CHECKING

from sqlalchemy.exc import DatabaseError
from sqlmodel import Session, select

from assignments_backend.database import engine
from assignments_backend.errors import HTTPIntegrityError, HTTPNotFoundError
from assignments_backend.models.group import Group
from assignments_backend.operations.hashing import hash_value
from assignments_backend.schemas import group as group_schemas

if TYPE_CHECKING:
    from sqlmodel.sql.expression import SelectOfScalar


async def create_group(group: group_schemas.CreateGroup) -> Group:
    with Session(engine) as session:
        group_entity = Group.model_validate(group)

        session.add(group_entity)

        try:
            session.commit()
        except DatabaseError as e:
            raise HTTPIntegrityError from e

        session.refresh(group_entity)

        return group_entity


async def get_group(
    student_code: str | None = None,
    editor_code: str | None = None,
) -> Group:
    def _get_by_student_code(student_code: str) -> "SelectOfScalar[Group]":
        student_code = hash_value(student_code)
        return select(Group).where(
            Group.student_code == student_code,
        )

    def _get_by_editor_code(editor_code: str) -> "SelectOfScalar[Group]":
        editor_code = hash_value(editor_code)
        return select(Group).where(
            Group.editor_code == editor_code,
        )

    pair = (student_code, editor_code)
    if not any(pair) or all(pair):
        raise RuntimeError("You must provide either student_code or editor_code")

    query = _get_by_student_code(student_code) if student_code else _get_by_editor_code(editor_code)

    with Session(engine) as session:
        group = session.exec(query).first()

        if group is None:
            raise HTTPNotFoundError

        return group


async def update_group(editor_code: str, update: group_schemas.CreateGroup) -> Group:
    editor_code = hash_value(editor_code)

    with Session(engine) as session:
        query = select(Group).where(
            Group.editor_code == editor_code,
        )

        existing_group = session.exec(query).first()

        if existing_group is None:
            raise HTTPNotFoundError

        existing_group = existing_group.sqlmodel_update(
            update,
        )

        session.add(existing_group)

        try:
            session.commit()
        except DatabaseError as e:
            raise HTTPIntegrityError from e

        session.refresh(existing_group)

        return existing_group

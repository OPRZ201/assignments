from typing import Annotated

from fastapi import Body, Header

from assignments_backend.operations import group as group_operations
from assignments_backend.schemas import group as group_schemas

from .router import router


@router.get(
    "/groups/",
    tags=["Groups", "Groups Public"],
)
async def get_group(
    student_code: Annotated[str, Header(alias="X-Student-Code")],
) -> group_schemas.Group:
    return await group_operations.get_group(student_code)


@router.post(
    "/groups/",
    tags=["Groups", "Groups Management"],
)
async def create_group(
    group: Annotated[group_schemas.CreateGroup, Body()],
) -> group_schemas.Group:
    return await group_operations.create_group(group)


@router.put(
    "/groups/",
    tags=["Groups", "Groups Management"],
)
async def update_group(
    editor_code: Annotated[str, Header(alias="X-Editor-Code")],
    group: Annotated[group_schemas.CreateGroup, Body()],
) -> group_schemas.Group:
    return await group_operations.update_group(
        editor_code,
        group,
    )

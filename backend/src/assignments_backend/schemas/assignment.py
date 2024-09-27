import datetime
from typing import Literal

import pydantic

from assignments_backend.schemas.pagination import PaginatedResponse, PaginationByDate
from assignments_backend.utils import get_utc_now


class CreateAssignment(pydantic.BaseModel):
    issuer: str
    title: str
    description: str
    full_description: str
    assigned_at: datetime.datetime = pydantic.Field(
        default_factory=get_utc_now,
    )
    due_to: datetime.datetime
    mandatory: bool


class Assignment(pydantic.BaseModel):
    assignment_id: pydantic.UUID4 = pydantic.Field(
        alias="id",
        serialization_alias="assignment_id",
    )
    group_id: pydantic.UUID4

    issuer: str
    title: str
    description: str = pydantic.Field(
        description="Short preview of the description, plain text",
    )
    full_description: str = pydantic.Field(
        description="Base64 encoded description",
    )

    assigned_at: datetime.datetime
    due_to: datetime.datetime

    mandatory: bool

    model_config = pydantic.ConfigDict(
        from_attributes=True,
    )


class AssignmentsListRequest(PaginationByDate):
    order_by: Literal["created_at", "assigned_at", "due_to"] = "created_at"


class AssignmentsListResponse(PaginatedResponse):
    content: list[Assignment]

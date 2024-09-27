import datetime
from uuid import UUID

import sqlmodel

from .base import BaseModel


class Assignment(BaseModel, table=True):
    group_id: UUID = sqlmodel.Field(
        foreign_key="group.id",
    )

    issuer: str
    title: str
    description: str
    full_description: str
    assigned_at: datetime.datetime
    due_to: datetime.datetime
    mandatory: bool

import sqlmodel

from .base import BaseModel


class Group(BaseModel, table=True):
    name: str = sqlmodel.Field(
        unique=True,
    )

    editor_code: str = sqlmodel.Field(
        unique=True,
    )
    student_code: str = sqlmodel.Field(
        unique=True,
    )

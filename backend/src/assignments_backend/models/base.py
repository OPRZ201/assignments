import datetime
from uuid import UUID, uuid4

from pydantic import ConfigDict
from sqlmodel import Field, SQLModel

from assignments_backend.utils import get_utc_now


class BaseModel(SQLModel):
    id: UUID = Field(default_factory=uuid4, primary_key=True)

    created_at: datetime.datetime = Field(default_factory=get_utc_now)

    model_config = ConfigDict(
        from_attributes=True,
    )

import datetime
import hashlib

import pydantic


class CreateGroup(pydantic.BaseModel):
    name: str
    editor_code: str = pydantic.Field(min_length=8)
    student_code: str = pydantic.Field(min_length=8)

    @pydantic.field_validator(
        "editor_code",
        "student_code",
    )
    @classmethod
    def validate_codes(
        cls: type["CreateGroup"],
        value: str,
    ) -> str:
        return hashlib.sha3_512(value.encode()).hexdigest()

    @pydantic.model_validator(mode="after")
    def check_model(
        self: "CreateGroup",
    ) -> "CreateGroup":
        if self.editor_code == self.student_code:
            raise ValueError("Editor and student codes must be different")

        return self


class Group(pydantic.BaseModel):
    group_id: pydantic.UUID4 = pydantic.Field(
        alias="id",
        serialization_alias="group_id",
    )

    name: str

    editor_code: str
    student_code: str

    created_at: datetime.datetime

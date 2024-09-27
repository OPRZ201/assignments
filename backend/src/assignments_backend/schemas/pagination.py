from typing import Literal

import pydantic


class PaginationInput(pydantic.BaseModel):
    limit: int = 10
    offset: int = 0

    order_by: str = "id"
    order_direction: Literal["asc", "desc"] = "desc"


class PaginationByDate(PaginationInput):
    order_by: Literal["created_at"] = "created_at"
    order_direction: Literal["asc", "desc"] = "desc"


class PaginationMeta(pydantic.BaseModel):
    total: int
    limit: int
    offset: int


class PaginatedResponse(pydantic.BaseModel):
    meta: PaginationMeta
    content: list

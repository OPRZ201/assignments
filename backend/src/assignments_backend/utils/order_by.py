from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    import sqlmodel

    from assignments_backend.schemas.pagination import PaginationInput


def order_by(
    model: "type[sqlmodel.SQLModel]",
    pagination_input: "PaginationInput",
) -> "Any":  # noqa: ANN401
    return getattr(
        getattr(
            model,
            pagination_input.order_by,
        ),
        pagination_input.order_direction,
    )()

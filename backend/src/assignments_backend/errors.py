from typing import TYPE_CHECKING

from fastapi import HTTPException, logger, status

if TYPE_CHECKING:
    import pydantic


class BasicAPIError(HTTPException):
    status_code: int = status.HTTP_400_BAD_REQUEST
    error_name: str = "BaseError"
    detail: str | dict = "Base Error"

    def __init__(
        self: "BasicAPIError",
        detail_override: str | None = None,
        log_message: "pydantic.JsonValue | None" = None,
    ) -> None:
        logger.logger.error(
            {
                "message": self.detail,
                "error": self.error_name,
            },
            exc_info=True,
        )

        if log_message is not None:
            logger.logger.error(log_message)

        if detail_override is not None:
            self.detail = detail_override

        super().__init__(
            status_code=self.status_code,
            detail=self.detail,
            headers={
                "X-Error": self.error_name,
            },
        )


class InternalServerError(BasicAPIError):
    error_name: str = "InternalServerError"
    status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR
    detail: str = "Internal Server Error"


class HTTPIntegrityError(BasicAPIError):
    error_name: str = "IntegrityError"
    status_code: int = status.HTTP_409_CONFLICT
    detail: str = "Database Integrity Error"


class HTTPNotFoundError(BasicAPIError):
    error_name: str = "NotFoundError"
    status_code: int = status.HTTP_404_NOT_FOUND
    detail: str = "Resource Not Found"

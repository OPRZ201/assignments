from typing import TYPE_CHECKING

from sqlmodel import func

if TYPE_CHECKING:
    from sqlmodel import Session
    from sqlmodel.sql.expression import SelectOfScalar


def get_count(
    session: "Session",
    q: "SelectOfScalar",
) -> int:
    count_q = (
        q.with_only_columns(
            func.count(),
        )
        .order_by(
            None,
        )
        .select_from(
            q.get_final_froms()[0],
        )
    )
    iterator = session.exec(count_q)
    for count in iterator:
        return count
    return 0

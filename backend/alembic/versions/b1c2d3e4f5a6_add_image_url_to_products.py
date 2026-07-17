"""add image_url to products

Revision ID: b1c2d3e4f5a6
Revises: d8a6f0b93c41
Create Date: 2026-07-17 09:00:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "b1c2d3e4f5a6"
down_revision: Union[str, Sequence[str], None] = "d8a6f0b93c41"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {c["name"] for c in inspector.get_columns("products")}

    if "image_url" not in columns:
        op.add_column(
            "products",
            sa.Column("image_url", sa.String(length=2048), nullable=True),
        )


def downgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {c["name"] for c in inspector.get_columns("products")}

    if "image_url" in columns:
        op.drop_column("products", "image_url")
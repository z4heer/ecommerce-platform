"""add shipping_address to orders

Revision ID: c7d8e9f0a1b2
Revises: b1c2d3e4f5a6
Create Date: 2026-07-17 09:05:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "c7d8e9f0a1b2"
down_revision: Union[str, Sequence[str], None] = "b1c2d3e4f5a6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {c["name"] for c in inspector.get_columns("orders")}

    if "shipping_address" not in columns:
        # Add nullable first so existing rows aren't rejected, backfill,
        # then enforce NOT NULL — same pattern used in d8a6f0b93c41 for sku.
        op.add_column(
            "orders",
            sa.Column("shipping_address", sa.String(length=500), nullable=True),
        )
        op.execute(
            "UPDATE orders SET shipping_address = 'LEGACY ORDER - NO ADDRESS ON FILE' "
            "WHERE shipping_address IS NULL"
        )
        op.alter_column("orders", "shipping_address", nullable=False)


def downgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {c["name"] for c in inspector.get_columns("orders")}

    if "shipping_address" in columns:
        op.drop_column("orders", "shipping_address")
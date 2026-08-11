"""add missing schema columns

Revision ID: f1b2d3e4f5a6
Revises: c7d8e9f0a1b2
Create Date: 2026-08-11 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f1b2d3e4f5a6'
down_revision: Union[str, None] = 'c7d8e9f0a1b2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    # orders table
    orders_columns = {c["name"] for c in inspector.get_columns("orders")}
    if "order_number" not in orders_columns:
        op.add_column('orders', sa.Column('order_number', sa.String(length=50), nullable=True))
    if "payment_method" not in orders_columns:
        op.add_column('orders', sa.Column('payment_method', sa.String(), nullable=True))
    if "payment_status" not in orders_columns:
        op.add_column('orders', sa.Column('payment_status', sa.String(), nullable=True))
    if "payment_reference" not in orders_columns:
        op.add_column('orders', sa.Column('payment_reference', sa.String(length=255), nullable=True))
    if "payment_date" not in orders_columns:
        op.add_column('orders', sa.Column('payment_date', sa.DateTime(timezone=True), nullable=True))
    if "currency" not in orders_columns:
        op.add_column('orders', sa.Column('currency', sa.String(), nullable=True))

    # order_items table
    order_items_columns = {c["name"] for c in inspector.get_columns("order_items")}
    if "subtotal" not in order_items_columns:
        op.add_column('order_items', sa.Column('subtotal', sa.Numeric(precision=12, scale=2), nullable=True))
    if "product_name" not in order_items_columns:
        op.add_column('order_items', sa.Column('product_name', sa.String(length=255), nullable=True))
    if "product_sku" not in order_items_columns:
        op.add_column('order_items', sa.Column('product_sku', sa.String(length=100), nullable=True))


def downgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    order_items_columns = {c["name"] for c in inspector.get_columns("order_items")}
    if "product_sku" in order_items_columns:
        op.drop_column('order_items', 'product_sku')
    if "product_name" in order_items_columns:
        op.drop_column('order_items', 'product_name')
    if "subtotal" in order_items_columns:
        op.drop_column('order_items', 'subtotal')

    orders_columns = {c["name"] for c in inspector.get_columns("orders")}
    if "currency" in orders_columns:
        op.drop_column('orders', 'currency')
    if "payment_date" in orders_columns:
        op.drop_column('orders', 'payment_date')
    if "payment_reference" in orders_columns:
        op.drop_column('orders', 'payment_reference')
    if "payment_status" in orders_columns:
        op.drop_column('orders', 'payment_status')
    if "payment_method" in orders_columns:
        op.drop_column('orders', 'payment_method')
    if "order_number" in orders_columns:
        op.drop_column('orders', 'order_number')

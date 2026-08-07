from pydantic import BaseModel, Field
from typing import Literal


class MetricItem(BaseModel):
    id: str
    label: str
    value: str
    trend: Literal["up", "down", "stable"]


class SystemOrder(BaseModel):
    id: str
    customerName: str
    amount: float
    status: Literal["pending", "completed", "cancelled"]
    canCancel: bool


class DashboardResponse(BaseModel):
    metrics: list[MetricItem]
    orders: list[SystemOrder]

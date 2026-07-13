from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID

from app.database.session import get_db
from app.modules.auth.dependencies import (
    get_current_user,
    require_admin,
    require_customer,
)
from app.modules.orders.schemas.order_request import OrderStatusUpdateRequest
from app.modules.orders.schemas.order_response import OrderDetailResponse
from app.modules.orders.routers.order_router import get_order_service
from app.modules.orders.services.order_service import OrderService

admin_router = APIRouter(prefix="/api/v1/admin/orders", tags=["Admin Orders"])


@admin_router.get(
    "",
    response_model=list[OrderDetailResponse],
    dependencies=[Depends(require_admin)],
    summary="Get All Orders",
    description="Privileged administrative query yielding system-wide order profiles records.",
)
def admin_get_all_orders(service: OrderService = Depends(get_order_service)):
    return service.get_all_orders()


@admin_router.patch(
    "/{order_id}/status",
    response_model=OrderDetailResponse,
    dependencies=[Depends(require_admin)],
    summary="Update Order Status",
    description="Administrative lifecycle router used to alter progress status codes for an order via State-Machine evaluations.",
)
def admin_update_order(
    order_id: UUID,
    request: OrderStatusUpdateRequest,
    service: OrderService = Depends(get_order_service),
):
    return service.update_order_status(order_id=order_id, new_status=request.status)

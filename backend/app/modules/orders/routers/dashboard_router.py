from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.modules.auth.dependencies import require_admin
from app.modules.orders.repositories.dashboard_repository import DashboardRepository
from app.modules.orders.services.dashboard_service import DashboardService
from app.modules.orders.schemas.dashboard_schema import DashboardResponse

router = APIRouter(prefix="/api/v1/admin/dashboard", tags=["Admin Dashboard"])


def get_dashboard_service(db: Session = Depends(get_db)) -> DashboardService:
    repo = DashboardRepository(db)
    return DashboardService(repo)


@router.get(
    "",
    response_model=DashboardResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Admin Dashboard KPIs",
    description="Retrieves live backend aggregated metrics and recent order summaries for admin users.",
)
def get_admin_dashboard(
    current_user=Depends(require_admin),
    service: DashboardService = Depends(get_dashboard_service),
):
    return service.get_dashboard_metrics()

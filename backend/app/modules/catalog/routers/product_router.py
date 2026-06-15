# get_current_user(), require_admin() -- assumption: these are defined in app/modules/auth/dependencies.py
from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from app.database.session import get_db

from app.modules.catalog.schemas.product_request import (
    ProductCreate,
    ProductUpdate
)

from app.modules.catalog.services.product_service import (
    ProductService
)

router = APIRouter(
    prefix="/api/v1/products",
    tags=["Products"]
)

service = ProductService()

@router.get("")
def get_products(
    category: str | None = None,
    search: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    page: int = 1,
    size: int = 20,
    db=Depends(get_db)
):

    return service.get_products(
        db=db,
        category=category,
        search=search,
        min_price=min_price,
        max_price=max_price,
        page=page,
        size=size
    )
@router.get("/{product_id}")
def get_product(
    product_id: UUID,
    db=Depends(get_db)
):

    product = service.get_product(
        db,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product
@router.post("")
def create_product(
    payload: ProductCreate,
    db=Depends(get_db)
    #,current_user=Depends(require_admin)
):

    return service.create_product(
        db,
        payload
    )
@router.put("/{product_id}")
def update_product(
    product_id: UUID,
    payload: ProductUpdate,
    db=Depends(get_db)
    #,current_user=Depends(require_admin)
):

    product = service.get_product(
        db,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return service.update_product(
        db,
        product,
        payload
    )
@router.delete("/{product_id}")
def delete_product(
    product_id: UUID,
    db=Depends(get_db)
    #,current_user=Depends(require_admin)
):

    product = service.get_product(
        db,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    service.delete_product(
        db,
        product
    )

    return {
        "message": "Product deleted successfully"
    }
    
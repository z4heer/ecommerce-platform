from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.database.session import get_db

from app.modules.catalog.schemas.product_request import ProductCreate, ProductUpdate

from app.modules.catalog.services.product_service import ProductService

from app.modules.auth.dependencies import require_admin
from app.modules.catalog.repositories.product_repository import ProductRepository
from app.modules.catalog.repositories.inventory_repository import InventoryRepository
from app.core.logger import logger
from fastapi import status
from app.modules.catalog.schemas.product_response import ProductResponse

router = APIRouter(prefix="/api/v1/products", tags=["Products"])


@router.get("")
def get_products(
    category: str | None = None,
    search: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    page: int = 1,
    size: int = 20,
    db=Depends(get_db),
):

    try:
        service = ProductService(
            product_repo=ProductRepository(db), inventory_repo=InventoryRepository(db)
        )

        return service.get_products(
            db=db,
            category=category,
            search=search,
            min_price=min_price,
            max_price=max_price,
            page=page,
            size=size,
        )
    except ValueError as ex:

        raise HTTPException(status_code=400, detail=str(ex))


@router.get("/{product_id}")
def get_product(product_id: UUID, db=Depends(get_db)):
    try:
        service = ProductService(
            product_repo=ProductRepository(db), inventory_repo=InventoryRepository(db)
        )
        product = service.get_product(db, product_id)

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        return product
    except ValueError as ex:
        raise HTTPException(status_code=400, detail=str(ex))


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate, db=Depends(get_db), current_user=Depends(require_admin)
):
    try:
        service = ProductService(
            product_repo=ProductRepository(db), inventory_repo=InventoryRepository(db)
        )
        logger.info(
            f"Creating product with name: {payload.name}, category: {payload.category}, price: {payload.price}, stock_quantity: {payload.stock_quantity}  "
        )  # Debug log
        return service.create_product(db, payload)
    except ValueError as ex:
        raise HTTPException(status_code=400, detail=str(ex))


@router.put(
    "/{product_id}",
    response_model=ProductResponse,
    status_code=status.HTTP_200_OK,
)
def update_product(
    product_id: UUID,
    payload: ProductUpdate,
    db=Depends(get_db),
    current_user=Depends(require_admin),
):

    try:
        service = ProductService(
            product_repo=ProductRepository(db), inventory_repo=InventoryRepository(db)
        )
        product = service.get_product_entity(db, product_id)

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        return service.update_product(db, product, payload)
    except ValueError as ex:
        raise HTTPException(status_code=400, detail=str(ex))


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    product_id: UUID, db=Depends(get_db), urrent_user=Depends(require_admin)
):
    try:
        service = ProductService(
            product_repo=ProductRepository(db), inventory_repo=InventoryRepository(db)
        )
        product = service.get_product_entity(db, product_id)

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        service.delete_product(db, product)

        return {"message": "Product deleted successfully"}
    except ValueError as ex:

        raise HTTPException(status_code=400, detail=str(ex))

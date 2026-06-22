from fastapi import FastAPI

from app.core.health import check_database
from app.core.redis_client import check_redis

from app.modules.auth.routers.auth_router import (
    router as auth_router
)
from app.modules.catalog.routers.product_router import (
    router as product_router
)
from app.modules.orders.routers.order_router import (
    router as customer_router
)
from app.modules.orders.routers.admin_order_router import (
    admin_router as admin_order_router
)
from app.modules.orders.routers.order_router import (
    router as order_router
) 

app = FastAPI(
    title="E-Commerce Platform API",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(admin_order_router)
app.include_router(order_router)  # Include the order_router for customer orders




@app.get("/")
def root():
    return {
        "message": "E-Commerce Platform API Running"
    }


@app.get("/health")
def health_check():

    postgres_status = "DOWN"
    redis_status = "DOWN"

    postgres_error = None

    try:
        if check_database():
            postgres_status = "UP"
    except Exception as e:
        postgres_error = str(e)

    try:
        if check_redis():
            redis_status = "UP"
    except Exception:
        pass

    return {
        "api": "UP",
        "postgres": postgres_status,
        "redis": redis_status
        ##,"postgres_error": postgres_error
    }
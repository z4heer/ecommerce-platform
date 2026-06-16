import json

from app.core.cache import redis_client

from app.modules.catalog.models.product import Product
from app.modules.catalog.models.inventory import Inventory

from app.modules.catalog.repositories.product_repository import (
    ProductRepository
)

from app.modules.catalog.repositories.inventory_repository import (
    InventoryRepository
)


class ProductService:

    CACHE_KEY = "all_products"

    def __init__(self):

        self.product_repo = ProductRepository()

        self.inventory_repo = InventoryRepository()

    def create_product(
        self,
        db,
        payload
    ):

        product = Product(
            name=payload.name,
            description=payload.description,
            category=payload.category,
            price=payload.price
        )

        self.product_repo.create(
            db,
            product
        )

        inventory = Inventory(
            product_id=product.id,
            stock_quantity=payload.stock_quantity
        )

        self.inventory_repo.create(
            db,
            inventory
        )

        db.commit()

        redis_client.delete(
            self.CACHE_KEY
        )

        return product

    def get_products(
        self,
        db,
        category=None,
        min_price=None,
        max_price=None,
        search=None,
        page=1,
        size=20
    ):

        cached = redis_client.get(
            self.CACHE_KEY
        )

        if cached:
            #print("CACHE HIT")
            return json.loads(cached)
        products = self.product_repo.get_products(
            db=db,
            category=category,
            min_price=min_price,
            max_price=max_price,
            search=search,
            page=page,
            size=size
        )

        serialized = [
            {
                "id": str(p.id),
                "name": p.name,
                "description": p.description,
                "category": p.category,
                "price": float(p.price)
            }
            for p in products
        ]

        redis_client.set(
            self.CACHE_KEY,
            json.dumps(serialized),
            ex=300
        )

        return products

    def get_product(
        self,
        db,
        product_id
    ):
        return self.product_repo.get_by_id(
            db,
            product_id
        )

    def update_product(
        self,
        db,
        product,
        payload
    ):

        if payload.name:
            product.name = payload.name

        if payload.description:
            product.description = payload.description

        if payload.category:
            product.category = payload.category

        if payload.price:
            product.price = payload.price

        self.product_repo.update(
            db,
            product
        )

        db.commit()

        redis_client.delete(
            self.CACHE_KEY
        )

        return product

    def delete_product(
        self,
        db,
        product
    ):

        self.product_repo.soft_delete(
            db,
            product
        )

        db.commit()

        redis_client.delete(
            self.CACHE_KEY
        )
import json

from app.core.cache import redis_client

from app.modules.catalog.models.product import Product
from app.modules.catalog.models.inventory import Inventory

from app.modules.catalog.repositories.product_repository import ProductRepository

from app.modules.catalog.repositories.inventory_repository import InventoryRepository


class ProductService:

    CACHE_KEY = "all_products"

    def __init__(
        self, product_repo: ProductRepository, inventory_repo: InventoryRepository
    ):
        self.product_repo = product_repo
        self.inventory_repo = inventory_repo

    def create_product(self, db, payload):

        product = Product(
            name=payload.name,
            description=payload.description,
            category=payload.category,
            price=payload.price,
        )

        self.product_repo.create(db, product)

        inventory = Inventory(
            product_id=product.id, stock_quantity=payload.stock_quantity
        )

        self.inventory_repo.create(db, inventory)

        db.commit()

        redis_client.delete(self.CACHE_KEY)

        return product

    def get_products(
        self,
        db,
        category=None,
        min_price=None,
        max_price=None,
        search=None,
        page=1,
        size=20,
    ):

        cached = redis_client.get(self.CACHE_KEY)

        if cached:
            # print("CACHE HIT")
            return json.loads(cached)
        products = self.product_repo.get_products(
            db=db,
            category=category,
            min_price=min_price,
            max_price=max_price,
            search=search,
            page=page,
            size=size,
        )
        serialized = [
            {
                "id": str(p.id),
                "name": p.name,
                "description": p.description,
                "category": p.category,
                "price": float(p.price),
                "stock_quantity": p.inventory.stock_quantity if p.inventory else 0,
                "status": (
                    "Out of Stock"
                    if p.inventory.stock_quantity == 0
                    else "Low Stock" if p.inventory.stock_quantity < 10 else "In Stock"
                ),
            }
            for p in products
        ]

        redis_client.set(self.CACHE_KEY, json.dumps(serialized), ex=300)

        return serialized

    def get_product(self, db, product_id):
        product = self.product_repo.get_by_id(db, product_id)

        if not product:
            return None

        stock = product.inventory.stock_quantity if product.inventory else 0

        status = (
            "Out of Stock" if stock == 0 else "Low Stock" if stock < 10 else "In Stock"
        )

        return {
            "id": str(product.id),
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": float(product.price),
            "stock_quantity": stock,
            "status": status,
        }

    def update_product(self, db, product, payload):

        if payload.name:
            product.name = payload.name

        if payload.description:
            product.description = payload.description

        if payload.category:
            product.category = payload.category

        if payload.price:
            product.price = payload.price

        self.product_repo.update(db, product)

        db.commit()

        redis_client.delete(self.CACHE_KEY)

        return product

    def delete_product(self, db, product):

        self.product_repo.soft_delete(db, product)

        db.commit()

        redis_client.delete(self.CACHE_KEY)

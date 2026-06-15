# Import models so SQLAlchemy registers them
# Auth Models
from app.modules.auth.models.user import User
from app.modules.auth.models.roles import Role

# Catalog Models
from app.modules.catalog.models.product import Product
from app.modules.catalog.models.inventory import Inventory
import re
from decimal import Decimal
from seed_data.products import PRODUCTS

CATEGORY_SEEDS = [
    {
        "name": "Electronics",
        "slug": "electronics",
        "description": "Smartphones, tablets, streaming devices, and portable electronics.",
    },
    {
        "name": "Computers",
        "slug": "computers",
        "description": "Laptops, desktops, monitors, keyboards, mice, and external storage.",
    },
    {
        "name": "Footwear",
        "slug": "footwear",
        "description": "Hiking boots, running shoes, sneakers, loafers, and boots.",
    },
    {
        "name": "Home",
        "slug": "home",
        "description": "Coffee makers, fans, purifiers, desk lamps, knife sets, and pillows.",
    },
    {
        "name": "Audio",
        "slug": "audio",
        "description": "Bluetooth speakers, noise-cancelling headphones, wireless earbuds, turntables, and microphones.",
    },
]


def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


PRODUCT_SEEDS = []
for p in PRODUCTS:
    slug = _slugify(p["name"])
    PRODUCT_SEEDS.append(
        {
            "sku": p["sku"],
            "name": p["name"],
            "description": p["description"],
            "price": Decimal(p["price"]),
            "stock": p["stock_quantity"],
            "category": p["category"],
            "image_url": f"/static/product_images/{slug}.svg",
            "image_alt": f"{p['name']} illustration",
        }
    )

ADMIN_USER_SEED = {
    "email": "admin@enterprise-shop.local",
    "password": "Admin@12345",
    "role_name": "Admin",
}


CUSTOMER_USER_SEED = {
    "email": "customer@enterprise-shop.local",
    "password": "Customer@12345",
    "role_name": "Customer",
}


"""
Master category list.

NOTE: Product.category is currently a plain string column (see product.py),
not a foreign key to categories.id — this seeder populates both the
`categories` table (for whatever admin/dropdown use it's meant for) and
sets Product.category to the matching name string, so both stay
consistent until/unless a category_id FK migration lands.
"""

CATEGORIES = [
    {"name": "Electronics", "description": "Phones, cameras, wearables, and everyday gadgets."},
    {"name": "Computers", "description": "Laptops, desktops, monitors, and PC peripherals."},
    {"name": "Footwear", "description": "Shoes and boots for sport, work, and everyday wear."},
    {"name": "Home", "description": "Small appliances, furniture, and household essentials."},
    {"name": "Audio", "description": "Speakers, headphones, and other listening gear."},
]

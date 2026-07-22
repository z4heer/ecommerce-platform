"""
Generates one lightweight SVG placeholder per product: a pastel card with a
simple flat vector icon (matched to the product's category) and the product
name in a caption pill at the bottom — echoing the "image + name label"
layout of your reference sample, without a raster/AI-generated image.
Each file is well under 1.5KB.

Usage (standalone):
    python scripts/generate_placeholder_images.py

Usage (from seed_database.py):
    from scripts.generate_placeholder_images import generate_product_svgs
    image_map = generate_product_svgs(PRODUCTS)   # {sku: image_url}
"""

import re
from pathlib import Path

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "static" / "product_images"

# Pastel background + accent icon colour per category.
CATEGORY_STYLE = {
    "Electronics": {"bg": "#DCE9FF", "accent": "#3B6FE0"},
    "Computers": {"bg": "#E4E0FB", "accent": "#6C4FD6"},
    "Footwear": {"bg": "#FDE8D8", "accent": "#D97A2E"},
    "Home": {"bg": "#E1F3E6", "accent": "#2F9E5C"},
    "Audio": {"bg": "#F8E1EE", "accent": "#C43E80"},
}
DEFAULT_STYLE = {"bg": "#EDEDED", "accent": "#666666"}

# Simple flat icon paths, drawn centered around (150, 120), ~90px tall.
ICONS = {
    "Electronics": """
        <rect x="118" y="70" width="64" height="110" rx="10" fill="{accent}"/>
        <rect x="126" y="82" width="48" height="78" rx="2" fill="{bg}"/>
        <circle cx="150" cy="168" r="4" fill="{bg}"/>
    """,
    "Computers": """
        <rect x="100" y="70" width="100" height="66" rx="4" fill="{accent}"/>
        <rect x="108" y="78" width="84" height="50" fill="{bg}"/>
        <path d="M85 150 h130 l-10 18 h-110 z" fill="{accent}"/>
    """,
    "Footwear": """
        <path d="M95 165 q0 -14 14 -18 l45 -16 q10 -4 18 2 l20 15
                 q8 6 16 6 h12 q8 0 8 8 v10 q0 8 -8 8 h-115 q-10 0 -10 -9 z"
              fill="{accent}"/>
        <path d="M95 165 q0 -14 14 -18 l20 -7 q4 10 -2 16 l-10 9 z" fill="{bg}"/>
    """,
    "Home": """
        <path d="M150 62 l58 42 v10 h-116 v-10 z" fill="{accent}"/>
        <rect x="108" y="112" width="84" height="58" rx="6" fill="{accent}"/>
        <rect x="122" y="128" width="24" height="30" fill="{bg}"/>
        <rect x="154" y="128" width="24" height="30" fill="{bg}"/>
    """,
    "Audio": """
        <rect x="120" y="65" width="60" height="110" rx="16" fill="{accent}"/>
        <circle cx="150" cy="95" r="12" fill="{bg}"/>
        <circle cx="150" cy="145" r="20" fill="{bg}"/>
        <circle cx="150" cy="145" r="8" fill="{accent}"/>
    """,
}
DEFAULT_ICON = """
    <circle cx="150" cy="120" r="45" fill="{accent}"/>
"""


def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def _wrap_label(name: str, max_chars: int = 20) -> list[str]:
    """Greedy word-wrap so long product names fit the caption pill (max 2 lines)."""
    words = name.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if len(candidate) > max_chars and current:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines[:2]


def build_svg(name: str, category: str) -> str:
    style = CATEGORY_STYLE.get(category, DEFAULT_STYLE)
    icon = (ICONS.get(category, DEFAULT_ICON)).format(**style)
    lines = _wrap_label(name)

    line_height = 16
    pill_height = 30 + (len(lines) - 1) * line_height
    pill_y = 300 - pill_height - 14
    start_text_y = pill_y + pill_height / 2 - (len(lines) - 1) * line_height / 2 + 5

    text_elements = "".join(
        f'<text x="150" y="{start_text_y + i * line_height:.0f}" '
        f'font-family="Helvetica, Arial, sans-serif" font-size="13" '
        f'font-weight="600" fill="#2B2B2B" text-anchor="middle">{line}</text>'
        for i, line in enumerate(lines)
    )

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">'
        f'<rect width="300" height="300" rx="18" fill="{style["bg"]}"/>'
        f"{icon}"
        f'<rect x="20" y="{pill_y}" width="260" height="{pill_height}" rx="{pill_height/2}" '
        f'fill="#ffffff" fill-opacity="0.9"/>'
        f"{text_elements}"
        f"</svg>"
    )


def generate_product_svgs(
    products: list[dict], output_dir: Path = OUTPUT_DIR
) -> dict[str, str]:
    """Writes one .svg per product and returns a {sku: relative_image_url} map."""
    output_dir.mkdir(parents=True, exist_ok=True)
    image_map: dict[str, str] = {}

    for product in products:
        slug = _slugify(product["name"])
        filename = f"{slug}.svg"
        filepath = output_dir / filename
        filepath.write_text(
            build_svg(product["name"], product["category"]), encoding="utf-8"
        )
        image_map[product["sku"]] = f"/static/product_images/{filename}"

    return image_map


if __name__ == "__main__":
    import sys

    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
    from seed_data.products import PRODUCTS

    mapping = generate_product_svgs(PRODUCTS)
    total_bytes = sum(
        (OUTPUT_DIR / Path(url).name).stat().st_size for url in mapping.values()
    )
    print(f"Generated {len(mapping)} SVG placeholders in {OUTPUT_DIR}")
    print(
        f"Total size: {total_bytes / 1024:.1f} KB (avg {total_bytes / len(mapping):.0f} bytes/file)"
    )

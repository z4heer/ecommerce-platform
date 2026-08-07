"""
Generates lightweight, scalable SVG product images for all 30 catalog products.
Outputs to both backend static directory (for API serving) and frontend public assets
(for local frontend dev & standalone container rendering).
Each SVG file is under ~1.5KB, stylized, and optimized for fast vector rendering.

Usage:
    python scripts/generate_placeholder_images.py
"""

import re
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BACKEND_DIR.parent

OUTPUT_DIRS = [
    BACKEND_DIR / "static" / "product_images",
    PROJECT_ROOT / "frontend" / "ecommerce-frontend" / "public" / "assets" / "product_images",
]

# Color palettes by product category
CATEGORY_STYLE = {
    "Electronics": {"bg": "#EBF3FF", "card": "#3B82F6", "accent": "#1D4ED8", "text": "#1E293B"},
    "Smartphones": {"bg": "#EBF3FF", "card": "#3B82F6", "accent": "#1D4ED8", "text": "#1E293B"},
    "Computers": {"bg": "#F0F5FF", "card": "#6366F1", "accent": "#4338CA", "text": "#1E293B"},
    "Laptops": {"bg": "#F0F5FF", "card": "#6366F1", "accent": "#4338CA", "text": "#1E293B"},
    "Footwear": {"bg": "#FFF7ED", "card": "#F97316", "accent": "#C2410C", "text": "#1E293B"},
    "Home": {"bg": "#F0FDF4", "card": "#10B981", "accent": "#047857", "text": "#1E293B"},
    "Home Office": {"bg": "#F0FDF4", "card": "#10B981", "accent": "#047857", "text": "#1E293B"},
    "Smart Home": {"bg": "#F0FDF4", "card": "#059669", "accent": "#065F46", "text": "#1E293B"},
    "Audio": {"bg": "#FDF2F8", "card": "#EC4899", "accent": "#BE185D", "text": "#1E293B"},
    "Wearables": {"bg": "#FAF5FF", "card": "#8B5CF6", "accent": "#6D28D9", "text": "#1E293B"},
    "Accessories": {"bg": "#F8FAFC", "card": "#64748B", "accent": "#334155", "text": "#1E293B"},
    "Gaming": {"bg": "#EEF2FF", "card": "#4F46E5", "accent": "#3730A3", "text": "#1E293B"},
}
DEFAULT_STYLE = {"bg": "#F3F4F6", "card": "#6B7280", "accent": "#374151", "text": "#1E293B"}

# Detailed vector artwork per category
CATEGORY_ICONS = {
    "Electronics": """
        <!-- Smartphone / Device Graphics -->
        <rect x="110" y="55" width="80" height="135" rx="14" fill="{card}" stroke="{accent}" stroke-width="4"/>
        <rect x="118" y="68" width="64" height="100" rx="4" fill="#FFFFFF"/>
        <circle cx="150" cy="178" r="5" fill="#FFFFFF" opacity="0.8"/>
        <!-- Screen Content Lines -->
        <rect x="126" y="80" width="48" height="8" rx="4" fill="{card}" opacity="0.4"/>
        <rect x="126" y="95" width="36" height="6" rx="3" fill="{accent}" opacity="0.6"/>
        <circle cx="150" cy="125" r="16" fill="{card}" opacity="0.3"/>
        <path d="M144 125 L156 125 M150 119 L150 131" stroke="{accent}" stroke-width="3" stroke-linecap="round"/>
    """,
    "Computers": """
        <!-- Monitor & Desk Graphics -->
        <rect x="80" y="55" width="140" height="90" rx="8" fill="{card}" stroke="{accent}" stroke-width="4"/>
        <rect x="88" y="63" width="124" height="74" rx="4" fill="#FFFFFF"/>
        <path d="M135 145 L165 145 L170 170 L130 170 Z" fill="{accent}"/>
        <rect x="115" y="170" width="70" height="8" rx="4" fill="{card}"/>
        <!-- Code Window UI -->
        <rect x="96" y="73" width="108" height="12" rx="3" fill="{bg}"/>
        <circle cx="104" cy="79" r="2.5" fill="#EF4444"/>
        <circle cx="111" cy="79" r="2.5" fill="#F59E0B"/>
        <circle cx="118" cy="79" r="2.5" fill="#10B981"/>
        <rect x="96" y="92" width="60" height="6" rx="3" fill="{card}" opacity="0.5"/>
        <rect x="96" y="103" width="80" height="6" rx="3" fill="{accent}" opacity="0.4"/>
        <rect x="96" y="114" width="45" height="6" rx="3" fill="{card}" opacity="0.6"/>
    """,
    "Footwear": """
        <!-- Sneaker / Shoe Silhouette -->
        <path d="M80 155 Q85 110 120 100 L160 115 Q195 125 215 145 L225 155 Q230 170 220 175 L80 175 Z" fill="{card}" stroke="{accent}" stroke-width="4"/>
        <path d="M75 175 L230 175 Q235 175 235 185 L70 185 Q65 175 75 175 Z" fill="#FFFFFF" stroke="{accent}" stroke-width="3"/>
        <path d="M125 105 L155 120 M135 115 L165 130 M145 125 L175 140" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
        <circle cx="105" cy="140" r="12" fill="{accent}" opacity="0.3"/>
    """,
    "Home": """
        <!-- Home / Appliances Icon -->
        <path d="M150 50 L220 105 L205 105 L205 170 Q205 175 200 175 L100 175 Q95 175 95 170 L95 105 L80 105 Z" fill="{card}" stroke="{accent}" stroke-width="4"/>
        <rect x="125" y="115" width="50" height="60" rx="6" fill="#FFFFFF"/>
        <circle cx="150" cy="135" r="6" fill="{accent}"/>
        <path d="M150 145 L150 165" stroke="{accent}" stroke-width="3" stroke-linecap="round"/>
    """,
    "Audio": """
        <!-- Headphones / Speaker Vector -->
        <path d="M90 125 C90 75 210 75 210 125" fill="none" stroke="{accent}" stroke-width="10" stroke-linecap="round"/>
        <rect x="75" y="115" width="32" height="55" rx="12" fill="{card}" stroke="{accent}" stroke-width="3"/>
        <rect x="193" y="115" width="32" height="55" rx="12" fill="{card}" stroke="{accent}" stroke-width="3"/>
        <rect x="85" y="125" width="12" height="35" rx="6" fill="#FFFFFF" opacity="0.8"/>
        <rect x="203" y="125" width="12" height="35" rx="6" fill="#FFFFFF" opacity="0.8"/>
    """,
    "Wearables": """
        <!-- Smartwatch Graphics -->
        <rect x="125" y="45" width="50" height="145" rx="10" fill="{accent}" opacity="0.7"/>
        <rect x="110" y="80" width="80" height="80" rx="20" fill="{card}" stroke="{accent}" stroke-width="4"/>
        <rect x="120" y="90" width="60" height="60" rx="12" fill="#FFFFFF"/>
        <circle cx="150" cy="120" r="18" fill="{bg}"/>
        <path d="M150 110 L150 120 L160 125" stroke="{accent}" stroke-width="3" stroke-linecap="round"/>
    """,
    "Accessories": """
        <!-- Tech Dock / Adapter Graphic -->
        <rect x="85" y="85" width="130" height="70" rx="12" fill="{card}" stroke="{accent}" stroke-width="4"/>
        <rect x="100" y="110" width="22" height="10" rx="3" fill="#FFFFFF"/>
        <rect x="130" y="110" width="22" height="10" rx="3" fill="#FFFFFF"/>
        <rect x="160" y="110" width="40" height="10" rx="3" fill="#FFFFFF"/>
        <circle cx="110" cy="135" r="4" fill="#10B981"/>
    """,
    "Gaming": """
        <!-- Game Controller Vector -->
        <path d="M90 95 C110 90 190 90 210 95 C230 100 235 155 215 170 C200 180 180 155 165 145 L135 145 C120 155 100 180 85 170 C65 155 70 100 90 95 Z" fill="{card}" stroke="{accent}" stroke-width="4"/>
        <!-- D-Pad -->
        <path d="M105 115 H125 M115 105 V125" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
        <!-- Action Buttons -->
        <circle cx="180" cy="110" r="5" fill="#EF4444"/>
        <circle cx="195" cy="120" r="5" fill="#3B82F6"/>
        <circle cx="180" cy="130" r="5" fill="#10B981"/>
        <circle cx="165" cy="120" r="5" fill="#F59E0B"/>
    """,
}
DEFAULT_ICON = CATEGORY_ICONS["Accessories"]


def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def _wrap_label(name: str, max_chars: int = 22) -> list[str]:
    """Greedy word-wrap for caption pill (max 2 lines)."""
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
    icon_tmpl = CATEGORY_ICONS.get(category, CATEGORY_ICONS.get(category.split()[0], DEFAULT_ICON))
    icon = icon_tmpl.format(**style)
    lines = _wrap_label(name)

    line_height = 16
    pill_height = 32 + (len(lines) - 1) * line_height
    pill_y = 300 - pill_height - 14
    start_text_y = pill_y + pill_height / 2 - (len(lines) - 1) * line_height / 2 + 5

    text_elements = "".join(
        f'<text x="150" y="{start_text_y + i * line_height:.0f}" '
        f'font-family="system-ui, -apple-system, sans-serif" font-size="13" '
        f'font-weight="700" fill="{style["text"]}" text-anchor="middle">{line}</text>'
        for i, line in enumerate(lines)
    )

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">\n'
        f'  <defs>\n'
        f'    <linearGradient id="bg-grad-{_slugify(category)}" x1="0%" y1="0%" x2="100%" y2="100%">\n'
        f'      <stop offset="0%" stop-color="{style["bg"]}"/>\n'
        f'      <stop offset="100%" stop-color="#FFFFFF"/>\n'
        f'    </linearGradient>\n'
        f'    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">\n'
        f'      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.08"/>\n'
        f'    </filter>\n'
        f'  </defs>\n'
        f'  <rect width="300" height="300" rx="20" fill="url(#bg-grad-{_slugify(category)})"/>\n'
        f'  <g filter="url(#shadow)">\n'
        f'    {icon}\n'
        f'  </g>\n'
        f'  <g filter="url(#shadow)">\n'
        f'    <rect x="18" y="{pill_y}" width="264" height="{pill_height}" rx="{pill_height/2}" fill="#FFFFFF" fill-opacity="0.95" stroke="{style["card"]}" stroke-opacity="0.2" stroke-width="1"/>\n'
        f'    {text_elements}\n'
        f'  </g>\n'
        f'</svg>'
    )


def generate_product_svgs(
    products: list[dict], output_dirs: list[Path] = OUTPUT_DIRS
) -> dict[str, str]:
    """Writes SVGs to output directories and returns {sku: image_url} map."""
    for out_dir in output_dirs:
        out_dir.mkdir(parents=True, exist_ok=True)

    image_map: dict[str, str] = {}

    for product in products:
        slug = _slugify(product["name"])
        filename = f"{slug}.svg"
        svg_content = build_svg(product["name"], product["category"])

        for out_dir in output_dirs:
            filepath = out_dir / filename
            filepath.write_text(svg_content, encoding="utf-8")

        image_map[product["sku"]] = f"/static/product_images/{filename}"

    return image_map


if __name__ == "__main__":
    import sys

    sys.path.insert(0, str(BACKEND_DIR))
    from seed_data.products import PRODUCTS

    mapping = generate_product_svgs(PRODUCTS)
    print(f"Successfully generated {len(mapping)} SVG product images across {len(OUTPUT_DIRS)} directories:")
    for out_dir in OUTPUT_DIRS:
        print(f" - {out_dir}")


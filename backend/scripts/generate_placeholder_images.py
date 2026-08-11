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

# Detailed vector artwork per category, calibrated for 320x200 viewBox
CATEGORY_ICONS = {
    "Electronics": """
        <!-- Smartphone / Device Vector -->
        <rect x="125" y="25" width="70" height="135" rx="12" fill="{card}" stroke="{accent}" stroke-width="3"/>
        <rect x="131" y="36" width="58" height="100" rx="3" fill="#FFFFFF"/>
        <circle cx="160" cy="148" r="4" fill="{card}" opacity="0.8"/>
        <!-- Screen UI Details -->
        <rect x="139" y="48" width="42" height="6" rx="3" fill="{card}" opacity="0.4"/>
        <rect x="139" y="60" width="30" height="5" rx="2" fill="{accent}" opacity="0.6"/>
        <circle cx="160" cy="90" r="14" fill="{card}" opacity="0.25"/>
        <path d="M155 90 L165 90 M160 85 L160 95" stroke="{accent}" stroke-width="2.5" stroke-linecap="round"/>
    """,
    "Smartphones": """
        <!-- Smartphone / Device Vector -->
        <rect x="125" y="25" width="70" height="135" rx="12" fill="{card}" stroke="{accent}" stroke-width="3"/>
        <rect x="131" y="36" width="58" height="100" rx="3" fill="#FFFFFF"/>
        <circle cx="160" cy="148" r="4" fill="{card}" opacity="0.8"/>
        <!-- Screen UI Details -->
        <rect x="139" y="48" width="42" height="6" rx="3" fill="{card}" opacity="0.4"/>
        <rect x="139" y="60" width="30" height="5" rx="2" fill="{accent}" opacity="0.6"/>
        <circle cx="160" cy="90" r="14" fill="{card}" opacity="0.25"/>
        <path d="M155 90 L165 90 M160 85 L160 95" stroke="{accent}" stroke-width="2.5" stroke-linecap="round"/>
    """,
    "Computers": """
        <!-- Desktop / Monitor Vector -->
        <rect x="85" y="30" width="150" height="100" rx="8" fill="{card}" stroke="{accent}" stroke-width="3.5"/>
        <rect x="93" y="38" width="134" height="84" rx="4" fill="#FFFFFF"/>
        <path d="M142 130 L178 130 L184 158 L136 158 Z" fill="{accent}"/>
        <rect x="120" y="158" width="80" height="8" rx="4" fill="{card}"/>
        <!-- Code Window UI -->
        <rect x="101" y="48" width="118" height="12" rx="3" fill="{bg}"/>
        <circle cx="109" cy="54" r="2.5" fill="#EF4444"/>
        <circle cx="116" cy="54" r="2.5" fill="#F59E0B"/>
        <circle cx="123" cy="54" r="2.5" fill="#10B981"/>
        <rect x="101" y="68" width="65" height="6" rx="3" fill="{card}" opacity="0.5"/>
        <rect x="101" y="79" width="88" height="6" rx="3" fill="{accent}" opacity="0.4"/>
        <rect x="101" y="90" width="50" height="6" rx="3" fill="{card}" opacity="0.6"/>
    """,
    "Laptops": """
        <!-- Laptop Graphic -->
        <rect x="95" y="40" width="130" height="85" rx="6" fill="{card}" stroke="{accent}" stroke-width="3"/>
        <rect x="102" y="47" width="116" height="71" rx="3" fill="#FFFFFF"/>
        <path d="M70 130 L250 130 L240 145 L80 145 Z" fill="{accent}"/>
        <rect x="135" y="132" width="50" height="4" rx="2" fill="{card}"/>
    """,
    "Footwear": """
        <!-- Athletic Sneaker Vector -->
        <path d="M80 120 Q85 75 125 65 L170 80 Q210 90 235 110 L245 120 Q250 135 240 140 L80 140 Z" fill="{card}" stroke="{accent}" stroke-width="3.5"/>
        <path d="M75 140 L250 140 Q255 140 255 152 L70 152 Q65 140 75 140 Z" fill="#FFFFFF" stroke="{accent}" stroke-width="3"/>
        <path d="M130 70 L162 88 M142 82 L174 100 M154 94 L186 112" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="105" cy="105" r="14" fill="{accent}" opacity="0.3"/>
    """,
    "Home": """
        <!-- Coffee Maker / Home Appliance -->
        <path d="M110 35 L210 35 L210 150 Q210 160 200 160 L120 160 Q110 160 110 150 Z" fill="{card}" stroke="{accent}" stroke-width="3.5"/>
        <rect x="130" y="50" width="60" height="20" rx="4" fill="#FFFFFF" opacity="0.9"/>
        <path d="M125 90 L195 90 L185 140 Q185 145 180 145 L140 145 Q135 145 135 140 Z" fill="#FFFFFF" stroke="{accent}" stroke-width="2.5"/>
        <circle cx="160" cy="115" r="8" fill="{accent}" opacity="0.4"/>
    """,
    "Home Office": """
        <!-- Desk Monitor Vector -->
        <rect x="85" y="30" width="150" height="100" rx="8" fill="{card}" stroke="{accent}" stroke-width="3.5"/>
        <rect x="93" y="38" width="134" height="84" rx="4" fill="#FFFFFF"/>
        <path d="M142 130 L178 130 L184 158 L136 158 Z" fill="{accent}"/>
        <rect x="120" y="158" width="80" height="8" rx="4" fill="{card}"/>
    """,
    "Smart Home": """
        <!-- Smart Home Hub Vector -->
        <path d="M160 30 L225 80 L210 80 L210 155 Q210 160 205 160 L115 160 Q110 160 110 155 L110 80 L95 80 Z" fill="{card}" stroke="{accent}" stroke-width="3.5"/>
        <circle cx="160" cy="110" r="22" fill="#FFFFFF"/>
        <circle cx="160" cy="110" r="10" fill="{accent}"/>
    """,
    "Audio": """
        <!-- Over-Ear Headphones Vector -->
        <path d="M95 105 C95 50 225 50 225 105" fill="none" stroke="{accent}" stroke-width="9" stroke-linecap="round"/>
        <rect x="80" y="95" width="34" height="60" rx="14" fill="{card}" stroke="{accent}" stroke-width="3"/>
        <rect x="206" y="95" width="34" height="60" rx="14" fill="{card}" stroke="{accent}" stroke-width="3"/>
        <rect x="90" y="105" width="14" height="40" rx="7" fill="#FFFFFF" opacity="0.85"/>
        <rect x="216" y="105" width="14" height="40" rx="7" fill="#FFFFFF" opacity="0.85"/>
    """,
    "Wearables": """
        <!-- Smartwatch Vector -->
        <rect x="135" y="20" width="50" height="160" rx="10" fill="{accent}" opacity="0.75"/>
        <rect x="118" y="55" width="84" height="84" rx="22" fill="{card}" stroke="{accent}" stroke-width="3.5"/>
        <rect x="128" y="65" width="64" height="64" rx="14" fill="#FFFFFF"/>
        <circle cx="160" cy="97" r="18" fill="{bg}"/>
        <path d="M160 86 L160 97 L171 102" stroke="{accent}" stroke-width="3" stroke-linecap="round"/>
    """,
    "Accessories": """
        <!-- Multi-Port Work Dock Vector -->
        <rect x="90" y="60" width="140" height="75" rx="14" fill="{card}" stroke="{accent}" stroke-width="3.5"/>
        <rect x="108" y="85" width="24" height="12" rx="3" fill="#FFFFFF"/>
        <rect x="140" y="85" width="24" height="12" rx="3" fill="#FFFFFF"/>
        <rect x="172" y="85" width="42" height="12" rx="3" fill="#FFFFFF"/>
        <circle cx="118" cy="112" r="4.5" fill="#10B981"/>
    """,
    "Gaming": """
        <!-- Game Controller Vector -->
        <path d="M95 70 C118 65 202 65 225 70 C245 75 250 135 230 150 C215 160 195 135 178 125 L142 125 C125 135 105 160 90 150 C70 135 75 75 95 70 Z" fill="{card}" stroke="{accent}" stroke-width="3.5"/>
        <!-- D-Pad -->
        <path d="M110 97 H130 M120 87 V107" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Action Buttons -->
        <circle cx="192" cy="90" r="5" fill="#EF4444"/>
        <circle cx="206" cy="100" r="5" fill="#3B82F6"/>
        <circle cx="192" cy="110" r="5" fill="#10B981"/>
        <circle cx="178" cy="100" r="5" fill="#F59E0B"/>
    """,
}
DEFAULT_ICON = CATEGORY_ICONS["Accessories"]


def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def _wrap_label(name: str, max_chars: int = 24) -> list[str]:
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

    line_height = 14
    pill_height = 26 + (len(lines) - 1) * line_height
    pill_y = 200 - pill_height - 10
    start_text_y = pill_y + pill_height / 2 - (len(lines) - 1) * line_height / 2 + 4

    text_elements = "".join(
        f'<text x="160" y="{start_text_y + i * line_height:.0f}" '
        f'font-family="system-ui, -apple-system, sans-serif" font-size="11" '
        f'font-weight="700" fill="{style["text"]}" text-anchor="middle">{line}</text>'
        for i, line in enumerate(lines)
    )

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">\n'
        f'  <defs>\n'
        f'    <linearGradient id="bg-grad-{_slugify(category)}" x1="0%" y1="0%" x2="100%" y2="100%">\n'
        f'      <stop offset="0%" stop-color="{style["bg"]}"/>\n'
        f'      <stop offset="100%" stop-color="#FFFFFF"/>\n'
        f'    </linearGradient>\n'
        f'    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">\n'
        f'      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.08"/>\n'
        f'    </filter>\n'
        f'  </defs>\n'
        f'  <rect width="320" height="200" rx="14" fill="url(#bg-grad-{_slugify(category)})"/>\n'
        f'  <g filter="url(#shadow)">\n'
        f'    {icon}\n'
        f'  </g>\n'
        f'  <g filter="url(#shadow)">\n'
        f'    <rect x="20" y="{pill_y}" width="280" height="{pill_height}" rx="{pill_height/2}" fill="#FFFFFF" fill-opacity="0.94" stroke="{style["card"]}" stroke-opacity="0.2" stroke-width="1"/>\n'
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


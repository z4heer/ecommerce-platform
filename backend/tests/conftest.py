from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parent.parent

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Force SQLAlchemy mapper registration
from app.database.models import *
from sqlalchemy.orm import configure_mappers
configure_mappers()

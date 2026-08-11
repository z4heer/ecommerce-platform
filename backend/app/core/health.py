from sqlalchemy import create_engine, text

from app.core.config import settings

DATABASE_URL = (
    f"postgresql://"
    f"{settings.POSTGRES_USER}:"
    f"{settings.POSTGRES_PASSWORD}@"
    f"{settings.POSTGRES_HOST}:"
    f"{settings.POSTGRES_PORT}/"
    f"{settings.POSTGRES_DB}"
)

engine = create_engine(DATABASE_URL)


def check_database():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
        return True

#!/usr/bin/env python3

#"""
#Repository Doctor
#
#Quick health check for the Enterprise E-Commerce Platform.
#"""
from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parent.parent

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
    
from pathlib import Path
import os
import shutil
import sys
from sqlalchemy import text
from redis import Redis
from app.core.config import settings
from sqlalchemy import create_engine

PASS = "[PASS]"
FAIL = "[FAIL]"
WARN = "[WARN]"


def check_python():
    version = sys.version_info

    if version >= (3, 12):
        print(f"{PASS} Python Version      : {version.major}.{version.minor}.{version.micro}")
    else:
        print(f"{FAIL} Python Version      : {version.major}.{version.minor}.{version.micro}")


def check_venv():
    if os.environ.get("VIRTUAL_ENV"):
        print(f"{PASS} Virtual Environment : Active")
    else:
        print(f"{FAIL} Virtual Environment : Not Active")


def check_env():
    env_file = Path(".env")

    if env_file.exists():
        print(f"{PASS} .env File           : Found")
    else:
        print(f"{WARN} .env File           : Missing")


def check_command(command: str, name: str):
    if shutil.which(command):
        print(f"{PASS} {name:<20}: Installed")
    else:
        print(f"{FAIL} {name:<20}: Missing")


def check_postgres():
    try:

        host = settings.POSTGRES_HOST
        if host == "postgres":
            host = "localhost"
        database_url = (
            f"postgresql://"
            f"{settings.POSTGRES_USER}:"
            f"{settings.POSTGRES_PASSWORD}@"
            f"{host}:"
            f"{settings.POSTGRES_PORT}/"
            f"{settings.POSTGRES_DB}"
        )

        doctor_engine = create_engine(database_url)
        with doctor_engine.begin() as connection:
            connection.execute(text("SELECT 1"))

        print(f"{PASS} PostgreSQL         : Reachable")

    except Exception as e:
        print(f"{FAIL} PostgreSQL         : {e}")

def check_redis():
    try:
        host = settings.REDIS_HOST

        if host == "redis":
            host = "localhost"

        client = Redis(
            host=host,
            port=settings.REDIS_PORT,
            decode_responses=True,
        )

        client.ping()
        print(f"{PASS} Redis              : Reachable")
    except Exception as e:
        print(f"{FAIL} Redis              : {e}")

def main():
    print("=" * 52)
    print(" Enterprise E-Commerce Platform Doctor v1.0")
    print("=" * 52)

    check_python()
    check_venv()
    check_env()

    check_command("black", "Black")
    check_command("ruff", "Ruff")
    check_command("mypy", "MyPy")
    check_command("pytest", "Pytest")

    check_postgres()
    check_redis()

    print("=" * 52)
    print("Doctor completed.")
    print("=" * 52)


if __name__ == "__main__":
    main()
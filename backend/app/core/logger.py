import logging
import sys

LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"


def configure_logging() -> None:
    root_logger = logging.getLogger()

    if root_logger.handlers:
        return

    handler = logging.StreamHandler(sys.stdout)

    formatter = logging.Formatter(LOG_FORMAT)

    handler.setFormatter(formatter)

    root_logger.addHandler(handler)

    root_logger.setLevel(logging.INFO)


configure_logging()

logger = logging.getLogger("ecommerce")

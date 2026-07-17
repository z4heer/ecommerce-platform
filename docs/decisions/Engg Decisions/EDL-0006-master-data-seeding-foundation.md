# Engineering Decision Log

Decision ID
EDL-0006

Status
Accepted

Date
2026-07-16

Decision
Add a standalone category master table, a nullable unique `products.sku` field, and an idempotent backend seed framework for Sprint 4.6A master data initialization.

Context
Sprint 4.6A introduced richer catalog and order schema, but the backend still lacked a safe way to initialize master catalog data and baseline users outside Alembic migrations. The catalog model also stored product category as a string and did not yet expose a product SKU column even though order items persisted `product_sku`.

Options Considered
1. Seed master data inside Alembic migrations.
2. Keep category master data only as Python constants with no database table.
3. Add a minimal seedable schema and a dedicated seed script outside migrations.

Decision
Option 3 was selected. A dedicated `categories` table was added for master data management, `products.sku` was introduced as a nullable unique identifier to support idempotent product seeding without breaking existing API create flows, and seeding was implemented in a standalone script using SQLAlchemy ORM models and existing password hashing utilities.

Consequences
Master data can now be initialized repeatedly without duplicate rows. Alembic remains focused on schema evolution while the seed layer handles catalog and user bootstrap data. Product/category runtime behavior remains backward compatible because `Product.category` is still a string field.

Security Impact
Seeded users are created with hashed passwords through the existing security utility rather than storing plaintext passwords in the database.

Performance Impact
Negligible for runtime traffic. Seed execution performs bounded lookup-and-upsert operations over a small master dataset.

Maintenance Impact
Catalog master data is now centralized in a dedicated seed module, making future seed updates explicit and testable. A later sprint can migrate product categories from string storage to a relational foreign key if the application layer is updated to support it.

References
- `backend/alembic/versions/d8a6f0b93c41_add_catalog_master_data_support.py`
- `backend/scripts/seed_database.py`

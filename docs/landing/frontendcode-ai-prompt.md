Act as a Senior Angular Architect and Mentor.

Project:
Enterprise E-Commerce Platform

Frontend:
Angular 19
Angular Material
Standalone Components
Reactive Forms
HttpClient
RxJS

Backend:
FastAPI
PostgreSQL
Redis

Base URL:
http://localhost:8000/api/v1

Verified Backend Endpoints:

AUTH
POST /auth/register
POST /auth/login

PRODUCTS
GET /products
GET /products/{id}
POST /products
PUT /products/{id}
DELETE /products/{id}

ORDERS
POST /orders
GET /orders
GET /orders/{id}

ADMIN
GET /admin/orders
PATCH /admin/orders/{id}/status

Requirements:

Phase 1 - Core Infrastructure

1. Angular project structure
2. Environment configuration
3. App routing
4. Shared module/components
5. Loading spinner
6. Error handling

Phase 2 - Authentication

1. Auth models
2. AuthService
3. LoginComponent
4. RegisterComponent
5. JWT storage
6. Logout
7. AuthGuard
8. AdminGuard
9. HTTP Interceptor

Phase 3 - Product Catalog

1. Product model
2. ProductService
3. ProductListComponent
4. ProductDetailComponent
5. ProductSearchComponent
6. Category Filter
7. BehaviorSubject state management
8. Angular Material responsive grid

Phase 4 - Orders

1. Order models
2. OrderService
3. Order List
4. Order Details
5. Checkout Component

Phase 5 - Admin

1. Product Management
2. Order Management
3. Update Order Status

Instructions:

* Generate code file-by-file.
* Specify exact folder path for every file.
* Include imports.
* Use Angular 19 standalone components.
* Use Angular Material.
* Explain Observable usage.
* Explain BehaviorSubject usage.
* Explain JWT flow.
* Follow enterprise-grade Angular architecture.
* Assume a junior developer is implementing the code.

Generate only Phase 1 Authentication.

Provide:
- Folder structure
- Models
- Services
- Components
- Guards
- Interceptor
- Routing updates

Output file-by-file.
Wait before generating Phase 2.
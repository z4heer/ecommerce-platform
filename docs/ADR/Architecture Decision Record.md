##
Excellent. With those decisions approved, I would formally consider the **Architecture & Planning Phase complete**.

# Architecture Decision Record (ADR-001)

## Approved Decisions

| Area           | Decision                                          |
| -------------- | ------------------------------------------------- |
| Project Goal   | Python Full Stack + AI Solutions Portfolio        |
| Architecture   | Modular Monolith                                  |
| Frontend       | Angular                                           |
| Backend        | FastAPI                                           |
| Database       | PostgreSQL                                        |
| Cache          | Redis                                             |
| Authentication | JWT                                               |
| Roles          | Customer, Admin                                   |
| Inventory      | Simple Inventory Model                            |
| Search         | PostgreSQL + Redis Cache                          |
| Deployment     | Docker Compose                                    |
| MVP Scope      | Authentication, Products, Cart, Orders, Inventory |
| AI Features    | Future Phase                                      |
| CI/CD          | GitHub Actions                                    |
| Testing        | Pytest                                            |

---

# What Not To Change During MVP

Try to freeze these decisions until MVP completion.

Avoid:

❌ Switching Angular to React
❌ Switching FastAPI to Spring Boot
❌ Switching PostgreSQL to MongoDB
❌ Moving to Microservices
❌ Adding Kafka
❌ Adding Kubernetes
❌ Adding Elasticsearch
❌ Adding Payment Gateway

These are common sources of delay and unfinished portfolio projects.

---

# Definition of MVP Success

You should be able to demonstrate this flow:

```text
Customer
   ↓
Register
   ↓
Login
   ↓
Browse Products
   ↓
Search Products
   ↓
Add To Cart
   ↓
Checkout
   ↓
Order Created
   ↓
Admin Views Order
```

If this works end-to-end, the project is already strong enough for many interviews and portfolio reviews.

---

# Human Review Items Before Coding

Do one final pass on these areas:

### Business Review

* Does the customer journey make sense?
* Is any major feature missing from MVP?

### Database Review

* Are entity names clear and consistent?
* Are relationships understandable?

### API Review

* Are endpoint names intuitive?
* Are request/response structures reasonable?

### UI Review

Sketch the screens you expect:

```text
Login
Register

Product List
Product Details

Cart

Checkout

Order History

Admin Dashboard

Admin Product Management
```

Even rough hand-drawn sketches are enough.

### Dev Environment Review

Confirm you are comfortable with:

```text
Docker Desktop
WSL2
VS Code
Git
GitHub
PostgreSQL
Redis
Angular CLI
Python Virtual Environment
```

From our recent discussions, it sounds like you've already completed most of this setup.

---

# Recommended Next Session

When you return to implementation, start with:

## Sprint 1 – Foundation Setup

### Deliverables

```text
ecommerce-platform/

frontend/
backend/

docker-compose.yml
.env
README.md
```

And verify:

```text
docker compose up
```

Results in:

```text
Angular       → Running
FastAPI       → Running
PostgreSQL    → Connected
Redis         → Connected
Swagger UI    → Accessible
```
---
##

---

# 1. Project Goal Validation ⭐ Highest Priority

Ask yourself:

### Why am I building this project?

Choose one primary goal:

| Goal                              | Impact                   |
| --------------------------------- | ------------------------ |
| Get Python Full Stack Job         | Simpler architecture     |
| Become Solution Architect         | More documentation       |
| AI Solutions Specialist Portfolio | Add AI features later    |
| Freelance Product Development     | Focus on maintainability |
| Startup Product                   | Focus on scalability     |

### My Recommendation

Based on our previous discussions:

```text
Primary Goal:
Python Automation & AI Solutions Specialist

Secondary Goal:
Python Full Stack Developer

Tertiary Goal:
Solution Architect Showcase
```

This affects every future decision.

---

# 2. MVP Scope Validation ⭐ Highest Priority

Decide what version 1 includes.

### Recommended MVP

```text
Authentication
Products
Search
Cart
Orders
Inventory
Admin Product Management
```

### Not in MVP

```text
Payment Gateway
Reviews
Coupons
Wishlist
Notifications
Recommendation Engine
Microservices
Kubernetes
```

Question:

> Do I agree to keep MVP small?

If yes, development becomes much faster.

---

# 3. User Roles Validation

Current Design:

```text
Customer
Admin
```

Question:

Do you need:

```text
Customer
Admin
Warehouse Manager
Support Agent
Vendor
```

### Recommendation

Keep:

```text
Customer
Admin
```

for Version 1.

---

# 4. Inventory Model Validation

Current:

```text
available_qty
reserved_qty
```

Question:

Do you want:

### Simple Inventory

```text
Stock = 100
```

or

### Enterprise Inventory

```text
Available = 100
Reserved = 20
Damaged = 2
In Transit = 50
```

### Recommendation

Simple inventory for portfolio project.

---

# 5. Order Lifecycle Validation

Current Proposal

```text
PENDING
PAID
PROCESSING
SHIPPED
DELIVERED
CANCELLED
```

Question:

Is this enough?

### Recommendation

Yes.

---

# 6. Authentication Strategy Validation

Current:

```text
JWT Access Token
Refresh Token
Role-Based Access
```

Question:

Do you want:

```text
Email Login
```

or

```text
Google Login
GitHub Login
```

### Recommendation

Only email login in MVP.

---

# 7. Product Catalog Validation

Question:

What are we selling?

### Option A

Generic products

```text
Laptop
Mobile
Shoes
Books
```

### Option B

Single domain

```text
Electronics Only
```

### Recommendation

Generic catalog.

Recruiters focus on architecture, not product niche.

---

# 8. Search Strategy Validation

Current:

```text
LIKE Search
Redis Cache
```

Future:

```text
Elasticsearch
AI Search
```

### Recommendation

Current design is enough.

---

# 9. Deployment Strategy Validation

Current:

```text
Docker Compose
```

Question:

Will project be:

```text
Local Portfolio
```

or

```text
Cloud Hosted
```

### Recommendation

Plan for cloud deployment later:

```text
Docker Compose
↓
AWS EC2
↓
GitHub Actions
```

---

# 10. AI Feature Validation ⭐ Important

Since your chosen career path includes AI solutions, decide now:

### Option 1

Build normal e-commerce.

### Option 2

Build e-commerce + AI roadmap.

Example future features:

```text
AI Product Search

"Show me gaming laptops under ₹80k"

AI Recommendation Engine

"Customers also bought"

AI Chat Assistant

"What phone should I buy?"
```

### Recommendation

Design for AI now, implement later.

---

# 11. Coding Standards Validation

Decide:

### Backend

```text
FastAPI
SQLAlchemy
Alembic
Pytest
Pydantic
```

### Frontend

```text
Angular
Angular Material
RxJS
```

### Recommendation

Approved.

---

# 12. Architecture Complexity Validation ⭐ Most Important

Ask yourself:

### Do I want

```text
Monolith
```

or

```text
Microservices
```

### Recommendation

For your goals:

```text
Modular Monolith
```

Structure:

```text
FastAPI

Auth Module
Product Module
Cart Module
Order Module
Inventory Module
```

One deployment.

One database.

Much easier to finish.

---

# Final Architecture Review Decision Sheet

If I were reviewing this project with you, I'd want explicit approval on only these 8 decisions:

| Decision        | Recommendation                   |
| --------------- | -------------------------------- |
| Project Goal    | AI + Python Full Stack Portfolio |
| MVP Scope       | Small                            |
| Roles           | Customer + Admin                 |
| Inventory       | Simple                           |
| Auth            | JWT                              |
| Product Catalog | Generic                          |
| Architecture    | Modular Monolith                 |
| Deployment      | Docker Compose                   |

If you can confidently say **"Yes"** to those 8 items, then the architecture is stable enough and you should stop designing and start Sprint 1 implementation. That usually means you're at the point where additional planning provides diminishing returns compared to building and learning from the implementation itself.

##
Record these in ADR, dated 30 June while working on Sprint 3.1B
Sprint 3.1B – Milestone 1
Task 1 – Enterprise Foundation
---

| Decision                        | Reason                                       |
| ------------------------------- | -------------------------------------------- |
| Standalone Components           | Aligns with Angular 19 best practices        |
| Layout Shell Pattern            | Prevents duplication across modules          |
| Configuration-driven Navigation | Simplifies future expansion and RBAC         |
| Centralized Constants           | Eliminates magic strings                     |
| Strongly Typed Models           | Improves maintainability and tooling support |

##
Enterprise Toolbar Component
Decision:
   Standalone Component
   OnPush
   Angular Material
   Inject API
   Shared Application Header
   No business logic
   Authentication delegated to AuthService
##
### StatusChip Component Standardization Pattern
All semantic tags, badge variations, indicators, and inline metadata flags must migrate from loose CSS or element abstractions to the unified standalone `<app-status-chip>`. Feature modules are strictly forbidden from implementing domain-specific chip elements or hardcoding local palette overrides. This maintains absolute styling consistency across core dashboards, product views, and enterprise tabular reporting structures.

## Record
   ADR-001 – Application Shell Pattern
   ADR-002 – Enterprise Toolbar
   ADR-003 – Responsive Layout Service
   ADR-004 – Configuration-Driven Navigation
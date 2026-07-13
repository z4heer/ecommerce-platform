Hello! As your technical guide and mentor, I've thoroughly reviewed the implementation plan for **Task AUTH-05: Complete JWT Authentication & RBAC Dependencies**.

This is a critical architectural step. Right now, your application is like a club that issues VIP wristbands (generates JWTs) but doesn't have bouncers at the door to check them (missing auth middleware/dependencies).

Below is your breakdown of **why** we are doing this, followed by a step-by-step implementation guide to keep you on track.

---

## 🎯 The Purpose (In Short)

The objective is to establish a secure **Role-Based Access Control (RBAC)** ecosystem.

* **Authentication (`get_current_user`)**: Verifies *who* the user is by decoding their incoming JWT token and loading their profile.


* **Authorization (`require_admin` / `require_customer`)**: Verifies *what* that user is allowed to do based on their assigned database role (e.g., stopping a standard customer from editing a product price).



By building these reusable FastAPI dependencies now, you protect your current product endpoints and completely clear the runway for the upcoming Orders and Customer modules.

---

## 🛠️ Step-by-Step Implementation Guide

### Phase 1: Core Security and Dependency Set-Up

#### Step 1: Update token utilities



Open `app/core/security.py`. Import `JWTError` and add the `decode_token` helper underneath your existing token creation logic. This safely attempts to unpack the cryptographic signature of incoming JWTs.

```python
from jose import jwt, JWTError # Add JWTError here

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

```

#### Step 2 & 3: Initialize the Auth Dependencies File



Create a brand new file at `app/modules/auth/dependencies.py`. Add your foundational framework imports and configure `OAuth2PasswordBearer`. This tells FastAPI to scan incoming request headers specifically for an `Authorization: Bearer <TOKEN>` string.

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session, joinedload
from app.database.session import get_db
from app.core.security import decode_token
from app.modules.auth.models.user import User

# Links security to your actual login route
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

```

---

### Phase 2: Writing the FastAPI Dependency Functions

#### Step 4: Implement `get_current_user`

Add this comprehensive middleware to `app/modules/auth/dependencies.py`. It handles decoding, payload validation, and performs an optimized database query using `joinedload` to eagerly fetch the user's role relation.

```python
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

    # Eagerly load role to prevent N+1 query issues later
    user = db.query(User).options(joinedload(User.role)).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user

```

#### Step 5 & 6: Layer on RBAC Checkers



Directly underneath `get_current_user`, write your gatekeeping functions. Notice how they leverage `Depends(get_current_user)` natively!

```python
def require_admin(current_user=Depends(get_current_user)):
    if current_user.role.name != "ADMIN":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return current_user

def require_customer(current_user=Depends(get_current_user)):
    if current_user.role.name != "CUSTOMER":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Customer access required")
    return current_user

```

---

### Phase 3: Securing the Catalog & Verifying Payloads

#### Step 7: Protect Product Router Endpoints



Now, apply your shiny new armor. Open `app/modules/catalog/routers/product_router.py` and protect your state-changing endpoints:

```python
from app.modules.auth.dependencies import require_admin

@router.post("")
def create_product(..., current_user=Depends(require_admin)):
    # Only admins make it here!
    ...

@router.put("/{product_id}")
def update_product(..., current_user=Depends(require_admin)):
    ...

```

#### Step 8: Double-check Token Strategy Alignment



Ensure your login endpoint generates claims mapping to `"sub"`. Standard JWT convention expects the user identification key to be labeled as `"sub"` (Subject). If your system uses `"user_id"`, alter your payload extraction code to match.

---

### Phase 4: Integration and Edge-Case Testing



Before turning this in, you must prove the system behaves correctly under realistic environments using local seed data.

1. **Seed Your Database**: Insert standard `'ADMIN'` and `'CUSTOMER'` records into your PostgreSQL `roles` table.


2. **Generate Hashes**: Use your application's native `hash_password()` utility to create mock credentials (`Password123`) for `admin@test.com` and `customer@test.com`.


3. **Verify the Matrices**: Create your local temporary `/whoami` or `/admin-only` endpoints to validate the matrix:



| Test Scenario | Header State | Expected HTTP Code |
| --- | --- | --- |
| **No Token**<br> | None | `401 Unauthorized`<br> |
| **Malformed Token**<br> | `Authorization: Bearer invalid_token`<br> | `401 Unauthorized`<br> |
| **Admin Route (Admin User)**<br> | `Bearer <ADMIN_TOKEN>`<br> | `200 OK`<br> |
| **Admin Route (Customer User)**<br> | `Bearer <CUSTOMER_TOKEN>`<br> | `403 Forbidden`<br> |
| **Deleted User Test**<br> | `Bearer <VALID_TOKEN_BUT_DELETED_DB_ROW>`<br> | `401 Unauthorized`<br> |

Once you check off these implementation blocks and verify the test data matrices, you are officially clear to jump right into building the Orders engine! Let me know if any database mapping or dependency injection loops pop up while writing the code.
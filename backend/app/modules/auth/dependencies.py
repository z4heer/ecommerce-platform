from fastapi import Depends, HTTPException, status
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session, joinedload
from app.database.session import get_db
from app.core.security import decode_token
from app.modules.auth.models.user import User

# Links security to your actual login route
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

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

def require_admin(current_user=Depends(get_current_user)):
    if current_user.role.name != "ADMIN":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return current_user

def require_customer(current_user=Depends(get_current_user)):
    if current_user.role.name != "CUSTOMER":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Customer access required")
    return current_user
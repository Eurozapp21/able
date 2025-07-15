from fastapi import FastAPI, HTTPException, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional, List
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

from database import SessionLocal, engine, Base
from models import *
from schemas import *
from auth import get_current_user, get_current_admin_user, create_access_token, verify_password, get_password_hash
from admin_routes import router as admin_router

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AbleTools API", description="Rehabilitation Equipment Management System")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include admin routes
app.include_router(admin_router)

# Security
security = HTTPBearer()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Auth Routes
@app.post("/api/auth/login", response_model=UserResponse)
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_credentials.username).first()
    
    if not user or not verify_password(user_credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.username})
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": user.role,
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.post("/api/auth/register", response_model=UserResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone=user_data.phone,
        address=user_data.address,
        city=user_data.city,
        postcode=user_data.postcode,
        occupation=user_data.occupation,
        role="user"
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    access_token = create_access_token(data={"sub": db_user.username})
    
    return {
        "id": db_user.id,
        "username": db_user.username,
        "email": db_user.email,
        "first_name": db_user.first_name,
        "last_name": db_user.last_name,
        "role": db_user.role,
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user

# Categories Routes
@app.get("/api/categories", response_model=List[CategoryResponse])
async def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).filter(Category.is_active == True).all()
    return categories

@app.get("/api/categories/{category_id}", response_model=CategoryResponse)
async def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id, Category.is_active == True).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@app.post("/api/admin/categories", response_model=CategoryResponse)
async def create_category(category: CategoryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@app.put("/api/admin/categories/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: int, category: CategoryUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    for field, value in category.dict(exclude_unset=True).items():
        setattr(db_category, field, value)
    
    db.commit()
    db.refresh(db_category)
    return db_category

@app.delete("/api/admin/categories/{category_id}")
async def delete_category(category_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db_category.is_active = False
    db.commit()
    return {"message": "Category deleted successfully"}

# Products Routes
@app.get("/api/products", response_model=List[ProductResponse])
async def get_products(skip: int = 0, limit: int = 100, category_id: Optional[int] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Product).filter(Product.is_active == True)
    
    if category_id:
        query = query.filter(Product.category_id == category_id)
    
    if search:
        query = query.filter(Product.name.contains(search))
    
    products = query.offset(skip).limit(limit).all()
    return products

@app.get("/api/products/featured", response_model=List[ProductResponse])
async def get_featured_products(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_featured == True, Product.is_active == True).all()
    return products

@app.get("/api/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Seminars Routes
@app.get("/api/seminars", response_model=List[SeminarResponse])
async def get_seminars(seminar_type: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Seminar).filter(Seminar.is_active == True)
    
    if seminar_type:
        query = query.filter(Seminar.type == seminar_type)
    
    seminars = query.all()
    return seminars

@app.get("/api/seminars/{seminar_id}", response_model=SeminarResponse)
async def get_seminar(seminar_id: int, db: Session = Depends(get_db)):
    seminar = db.query(Seminar).filter(Seminar.id == seminar_id, Seminar.is_active == True).first()
    if not seminar:
        raise HTTPException(status_code=404, detail="Seminar not found")
    return seminar

# Events Routes
@app.get("/api/events", response_model=List[EventResponse])
async def get_events(db: Session = Depends(get_db)):
    events = db.query(Event).all()
    return events

@app.get("/api/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

# Achievements Routes
@app.get("/api/achievements", response_model=List[AchievementResponse])
async def get_achievements(db: Session = Depends(get_db)):
    achievements = db.query(Achievement).all()
    return achievements

# Banners Routes
@app.get("/api/banners", response_model=List[BannerResponse])
async def get_banners(db: Session = Depends(get_db)):
    banners = db.query(Banner).filter(Banner.is_active == True).order_by(Banner.order).all()
    return banners

# Enquiries Routes
@app.get("/api/enquiries", response_model=List[EnquiryResponse])
async def get_enquiries(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == "admin":
        enquiries = db.query(Enquiry).all()
    else:
        enquiries = db.query(Enquiry).filter(Enquiry.user_id == current_user.id).all()
    return enquiries

@app.post("/api/enquiries", response_model=EnquiryResponse)
async def create_enquiry(enquiry: EnquiryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_enquiry = Enquiry(**enquiry.dict(), user_id=current_user.id)
    db.add(db_enquiry)
    db.commit()
    db.refresh(db_enquiry)
    return db_enquiry

# Serve static files
app.mount("/attached_assets", StaticFiles(directory="attached_assets"), name="attached_assets")
app.mount("/", StaticFiles(directory="public", html=True), name="public")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
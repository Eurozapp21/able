from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import SessionLocal
from models import *
from schemas import *
from auth import get_current_admin_user

router = APIRouter(prefix="/api/admin", tags=["admin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Admin Categories
@router.get("/categories", response_model=List[CategoryResponse])
async def get_admin_categories(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    categories = db.query(Category).all()
    return categories

@router.post("/categories", response_model=CategoryResponse)
async def create_admin_category(category: CategoryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.put("/categories/{category_id}", response_model=CategoryResponse)
async def update_admin_category(category_id: int, category: CategoryUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    for field, value in category.dict(exclude_unset=True).items():
        setattr(db_category, field, value)
    
    db.commit()
    db.refresh(db_category)
    return db_category

@router.delete("/categories/{category_id}")
async def delete_admin_category(category_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db.delete(db_category)
    db.commit()
    return {"message": "Category deleted successfully"}

# Admin Products
@router.get("/products", response_model=List[ProductResponse])
async def get_admin_products(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    products = db.query(Product).all()
    return products

@router.post("/products", response_model=ProductResponse)
async def create_admin_product(product: ProductCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/products/{product_id}", response_model=ProductResponse)
async def update_admin_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for field, value in product.dict(exclude_unset=True).items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/products/{product_id}")
async def delete_admin_product(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}

# Admin Seminars
@router.get("/seminars", response_model=List[SeminarResponse])
async def get_admin_seminars(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    seminars = db.query(Seminar).all()
    return seminars

@router.post("/seminars", response_model=SeminarResponse)
async def create_admin_seminar(seminar: SeminarCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_seminar = Seminar(**seminar.dict())
    db.add(db_seminar)
    db.commit()
    db.refresh(db_seminar)
    return db_seminar

@router.put("/seminars/{seminar_id}", response_model=SeminarResponse)
async def update_admin_seminar(seminar_id: int, seminar: SeminarUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_seminar = db.query(Seminar).filter(Seminar.id == seminar_id).first()
    if not db_seminar:
        raise HTTPException(status_code=404, detail="Seminar not found")
    
    for field, value in seminar.dict(exclude_unset=True).items():
        setattr(db_seminar, field, value)
    
    db.commit()
    db.refresh(db_seminar)
    return db_seminar

@router.delete("/seminars/{seminar_id}")
async def delete_admin_seminar(seminar_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_seminar = db.query(Seminar).filter(Seminar.id == seminar_id).first()
    if not db_seminar:
        raise HTTPException(status_code=404, detail="Seminar not found")
    
    db.delete(db_seminar)
    db.commit()
    return {"message": "Seminar deleted successfully"}

# Admin Events
@router.get("/events", response_model=List[EventResponse])
async def get_admin_events(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    events = db.query(Event).all()
    return events

@router.post("/events", response_model=EventResponse)
async def create_admin_event(event: EventCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_event = Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.put("/events/{event_id}", response_model=EventResponse)
async def update_admin_event(event_id: int, event: EventUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    for field, value in event.dict(exclude_unset=True).items():
        setattr(db_event, field, value)
    
    db.commit()
    db.refresh(db_event)
    return db_event

@router.delete("/events/{event_id}")
async def delete_admin_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(db_event)
    db.commit()
    return {"message": "Event deleted successfully"}

# Admin Users
@router.get("/users", response_model=List[UserResponse])
async def get_admin_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    users = db.query(User).all()
    return users

@router.put("/users/{user_id}", response_model=UserResponse)
async def update_admin_user(user_id: int, user_update: UserCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for field, value in user_update.dict(exclude_unset=True).items():
        if field == "password":
            from auth import get_password_hash
            setattr(db_user, field, get_password_hash(value))
        else:
            setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/users/{user_id}")
async def delete_admin_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_user.is_active = False
    db.commit()
    return {"message": "User deactivated successfully"}

# Admin Statistics
@router.get("/statistics")
async def get_admin_statistics(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    stats = {
        "total_users": db.query(User).count(),
        "total_products": db.query(Product).count(),
        "total_categories": db.query(Category).count(),
        "total_seminars": db.query(Seminar).count(),
        "total_events": db.query(Event).count(),
        "total_enquiries": db.query(Enquiry).count(),
        "active_users": db.query(User).filter(User.is_active == True).count(),
        "featured_products": db.query(Product).filter(Product.is_featured == True).count(),
    }
    return stats
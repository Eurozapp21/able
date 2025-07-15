from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    first_name: str
    last_name: str
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postcode: Optional[str] = None
    occupation: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime
    access_token: Optional[str] = None
    token_type: Optional[str] = None

    class Config:
        from_attributes = True

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    name_el: Optional[str] = None
    description: Optional[str] = None
    description_el: Optional[str] = None
    icon: Optional[str] = None
    image: Optional[str] = None
    parent_id: Optional[int] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    name_el: Optional[str] = None
    description: Optional[str] = None
    description_el: Optional[str] = None
    icon: Optional[str] = None
    image: Optional[str] = None
    parent_id: Optional[int] = None
    is_active: Optional[bool] = None

class CategoryResponse(CategoryBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Product Schemas
class ProductBase(BaseModel):
    name: str
    name_el: Optional[str] = None
    description: Optional[str] = None
    description_el: Optional[str] = None
    category_id: int
    images: Optional[List[str]] = None
    is_featured: Optional[bool] = False
    specifications: Optional[str] = None
    specifications_el: Optional[str] = None
    price: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    name_el: Optional[str] = None
    description: Optional[str] = None
    description_el: Optional[str] = None
    category_id: Optional[int] = None
    images: Optional[List[str]] = None
    is_featured: Optional[bool] = None
    specifications: Optional[str] = None
    specifications_el: Optional[str] = None
    price: Optional[str] = None
    is_active: Optional[bool] = None

class ProductResponse(ProductBase):
    id: int
    is_active: bool
    created_at: datetime
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True

# Seminar Schemas
class SeminarBase(BaseModel):
    title: str
    title_el: Optional[str] = None
    description: Optional[str] = None
    description_el: Optional[str] = None
    date: datetime
    location: Optional[str] = None
    location_el: Optional[str] = None
    speaker: Optional[str] = None
    speaker_el: Optional[str] = None
    image: Optional[str] = None
    fee: Optional[str] = None
    max_participants: Optional[int] = None
    type: str = "seminar"

class SeminarCreate(SeminarBase):
    pass

class SeminarUpdate(BaseModel):
    title: Optional[str] = None
    title_el: Optional[str] = None
    description: Optional[str] = None
    description_el: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    location_el: Optional[str] = None
    speaker: Optional[str] = None
    speaker_el: Optional[str] = None
    image: Optional[str] = None
    fee: Optional[str] = None
    max_participants: Optional[int] = None
    type: Optional[str] = None
    is_active: Optional[bool] = None

class SeminarResponse(SeminarBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Event Schemas
class EventBase(BaseModel):
    title: str
    title_el: Optional[str] = None
    content: Optional[str] = None
    content_el: Optional[str] = None
    date: datetime
    image: Optional[str] = None
    excerpt: Optional[str] = None
    excerpt_el: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    title_el: Optional[str] = None
    content: Optional[str] = None
    content_el: Optional[str] = None
    date: Optional[datetime] = None
    image: Optional[str] = None
    excerpt: Optional[str] = None
    excerpt_el: Optional[str] = None

class EventResponse(EventBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Enquiry Schemas
class EnquiryBase(BaseModel):
    type: str
    about: Optional[str] = None
    message: str

class EnquiryCreate(EnquiryBase):
    pass

class EnquiryResponse(EnquiryBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    user: Optional[UserResponse] = None

    class Config:
        from_attributes = True

# Achievement Schemas
class AchievementBase(BaseModel):
    title: str
    title_el: Optional[str] = None
    description: Optional[str] = None
    description_el: Optional[str] = None
    image: Optional[str] = None

class AchievementCreate(AchievementBase):
    pass

class AchievementResponse(AchievementBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Banner Schemas
class BannerBase(BaseModel):
    title: str
    title_el: Optional[str] = None
    subtitle: Optional[str] = None
    subtitle_el: Optional[str] = None
    image: str
    link: Optional[str] = None
    order: int = 0

class BannerCreate(BannerBase):
    pass

class BannerResponse(BannerBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True
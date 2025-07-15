from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    postcode = Column(String)
    occupation = Column(String)
    role = Column(String, default="user")  # "user" or "admin"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    enquiries = relationship("Enquiry", back_populates="user")

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    name_el = Column(String)
    description = Column(Text)
    description_el = Column(Text)
    icon = Column(String)
    image = Column(String)
    parent_id = Column(Integer, ForeignKey("categories.id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    products = relationship("Product", back_populates="category")
    parent = relationship("Category", remote_side=[id])

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    name_el = Column(String)
    description = Column(Text)
    description_el = Column(Text)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    images = Column(ARRAY(String))
    is_featured = Column(Boolean, default=False)
    specifications = Column(Text)
    specifications_el = Column(Text)
    price = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    category = relationship("Category", back_populates="products")

class Seminar(Base):
    __tablename__ = "seminars"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    title_el = Column(String)
    description = Column(Text)
    description_el = Column(Text)
    date = Column(DateTime, nullable=False)
    location = Column(String)
    location_el = Column(String)
    speaker = Column(String)
    speaker_el = Column(String)
    image = Column(String)
    fee = Column(String)
    max_participants = Column(Integer)
    type = Column(String, default="seminar")  # "seminar" or "training"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    title_el = Column(String)
    content = Column(Text)
    content_el = Column(Text)
    date = Column(DateTime, nullable=False)
    image = Column(String)
    excerpt = Column(String)
    excerpt_el = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Enquiry(Base):
    __tablename__ = "enquiries"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String, nullable=False)
    about = Column(String)
    message = Column(Text, nullable=False)
    status = Column(String, default="new")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="enquiries")
    messages = relationship("EnquiryMessage", back_populates="enquiry")

class EnquiryMessage(Base):
    __tablename__ = "enquiry_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    enquiry_id = Column(Integer, ForeignKey("enquiries.id"), nullable=False)
    sender_id = Column(Integer, ForeignKey("users.id"))
    sender_type = Column(String, nullable=False)  # 'user' or 'admin'
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    enquiry = relationship("Enquiry", back_populates="messages")
    sender = relationship("User")

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    title_el = Column(String)
    description = Column(Text)
    description_el = Column(Text)
    image = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Banner(Base):
    __tablename__ = "banners"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    title_el = Column(String)
    subtitle = Column(String)
    subtitle_el = Column(String)
    image = Column(String, nullable=False)
    link = Column(String)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

class CatalogueCategory(Base):
    __tablename__ = "catalogue_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    name_el = Column(String)
    description = Column(Text)
    description_el = Column(Text)
    slug = Column(String, unique=True, nullable=False)
    icon = Column(String)
    image = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    brochures = relationship("Brochure", back_populates="category")

class Brochure(Base):
    __tablename__ = "brochures"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    title_el = Column(String)
    description = Column(Text)
    description_el = Column(Text)
    category_id = Column(Integer, ForeignKey("catalogue_categories.id"), nullable=False)
    file_path = Column(String, nullable=False)
    file_size = Column(String)
    download_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    category = relationship("CatalogueCategory", back_populates="brochures")
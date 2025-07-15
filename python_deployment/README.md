# AbleTools Python Deployment Guide

## 🐍 Python Version of AbleTools

Your AbleTools website has been successfully converted from Node.js/Express to Python/FastAPI!

### 🚀 Technology Stack

**Backend:**
- **FastAPI** - Modern, fast web framework for Python
- **SQLAlchemy** - Database ORM for PostgreSQL
- **Pydantic** - Data validation and settings management
- **JWT Authentication** - Secure user authentication
- **Uvicorn** - ASGI server for production

**Frontend:**
- **React** - Same frontend application (unchanged)
- **Tailwind CSS** - Styling and responsive design
- **TypeScript** - Type safety and modern JavaScript

### 📁 Project Structure

```
python_server/
├── main.py              # FastAPI application entry point
├── database.py          # Database configuration
├── models.py            # SQLAlchemy database models
├── schemas.py           # Pydantic schemas for API
├── auth.py              # Authentication and JWT handling
├── admin_routes.py      # Admin API routes
├── data_seeder.py       # Database seeding script
├── run.py               # Server startup script
├── requirements.txt     # Python dependencies
└── .env                 # Environment variables
```

### 🔧 Key Features

✅ **Complete API Conversion:**
- All Express.js routes converted to FastAPI
- Full CRUD operations for all content types
- Admin authentication with JWT tokens
- Database operations with SQLAlchemy

✅ **Database Integration:**
- PostgreSQL support with your existing database
- SQLAlchemy ORM for type-safe database operations
- Database seeding with sample data
- Migrations support with Alembic

✅ **Authentication System:**
- JWT-based authentication
- Admin/user role management
- Secure password hashing with bcrypt
- Session management

✅ **Admin System:**
- Complete admin routes for all content management
- User management with role-based access
- Statistics and analytics endpoints
- Multilingual content support (English/Greek)

### 🔐 Admin Access

- **URL:** `http://localhost:8000/admin`
- **Username:** `admin`
- **Password:** `admin123`

### 📊 API Endpoints

**Authentication:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/me` - Current user info

**Public Content:**
- `GET /api/categories` - Product categories
- `GET /api/products` - Products with filtering
- `GET /api/seminars` - Seminars and training
- `GET /api/events` - News and events
- `GET /api/banners` - Homepage banners
- `GET /api/achievements` - Company achievements

**Admin Routes:**
- `GET /api/admin/statistics` - Dashboard statistics
- `/api/admin/categories` - Category management
- `/api/admin/products` - Product management
- `/api/admin/seminars` - Seminar management
- `/api/admin/events` - Event management
- `/api/admin/users` - User management

### 🌐 Deployment

**Development:**
```bash
cd python_server
python run.py
```

**Production:**
```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 📝 Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/database
SECRET_KEY=your_secret_key_here
PORT=8000
HOST=0.0.0.0
DEBUG=True
```

### 🔄 Migration Benefits

**Why Python/FastAPI:**
- **Performance:** FastAPI is one of the fastest Python frameworks
- **Type Safety:** Built-in Pydantic validation and type hints
- **Auto Documentation:** Automatic OpenAPI/Swagger documentation
- **Modern Python:** Async/await support and modern Python features
- **Easy Deployment:** Simple deployment to any Python hosting platform

**Maintained Features:**
- ✅ All existing functionality preserved
- ✅ Same database structure and data
- ✅ All admin features working
- ✅ Multilingual support (English/Greek)
- ✅ Authentication and authorization
- ✅ File serving and static assets

### 🎯 Next Steps

1. **Test the API:** Visit `http://localhost:8000/docs` for interactive API documentation
2. **Verify Admin Access:** Login at `/admin` with admin/admin123
3. **Deploy to Production:** Use the same database credentials for production
4. **Configure Frontend:** Update frontend API calls to use Python backend

Your AbleTools website is now running on modern Python technology while maintaining all existing functionality!
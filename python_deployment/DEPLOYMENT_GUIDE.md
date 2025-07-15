# 🐍 AbleTools Python Deployment Package

## Complete Python/FastAPI Conversion

This package contains your AbleTools website fully converted from Node.js to Python while maintaining all functionality.

### 📦 Package Contents

```
abletools-python-deployment/
├── main.py                  # FastAPI application entry point
├── database.py              # PostgreSQL database configuration
├── models.py                # SQLAlchemy database models
├── schemas.py               # Pydantic data validation schemas
├── auth.py                  # JWT authentication system
├── admin_routes.py          # Complete admin API routes
├── data_seeder.py           # Database initialization with sample data
├── python-production.py     # Production server startup
├── start.sh                 # Easy startup script
├── requirements.txt         # Python dependencies
├── .env                     # Environment configuration
├── public/                  # React frontend (built)
├── attached_assets/         # Company images and files
└── README.md               # This deployment guide
```

### 🚀 Quick Start

1. **Extract the package:**
   ```bash
   tar -xzf abletools-python-deployment.tar.gz
   cd abletools-python-deployment
   ```

2. **Run the startup script:**
   ```bash
   ./start.sh
   ```

3. **Access your website:**
   - **Website:** http://localhost:8000
   - **Admin Panel:** http://localhost:8000/admin
   - **API Documentation:** http://localhost:8000/docs

### 🔐 Admin Credentials

- **Username:** admin
- **Password:** admin123

### 🗄️ Database Configuration

The system is configured to work with your existing PostgreSQL database:

```
Host: localhost (or your database server)
Database: abletoolscom_dbengrweb
User: abletoolscom_dbengruser
Password: dbengrpwd140725
```

### 🌐 Production Deployment

For production hosting (cPanel, VPS, etc.):

1. **Install Python 3.11+ on your server**
2. **Upload all files to your web directory**
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Update database URL in .env file**
5. **Start the application:**
   ```bash
   python python-production.py
   ```

### 📊 API Endpoints

**Authentication:**
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration
- GET `/api/auth/me` - Current user info

**Content Management:**
- GET `/api/categories` - Product categories
- GET `/api/products` - Products with search/filter
- GET `/api/seminars` - Educational seminars
- GET `/api/events` - News and events
- GET `/api/banners` - Homepage banners
- GET `/api/achievements` - Company achievements

**Admin Routes (requires authentication):**
- GET `/api/admin/statistics` - Dashboard statistics
- CRUD `/api/admin/categories` - Category management
- CRUD `/api/admin/products` - Product management
- CRUD `/api/admin/seminars` - Seminar management
- CRUD `/api/admin/events` - Event management
- CRUD `/api/admin/users` - User management

### ✅ Features Preserved

- Complete admin system with multilingual support (English/Greek)
- User authentication and role-based access control
- Product catalog with categories and search functionality
- Seminar and training management system
- News and events publishing
- File upload and asset management
- Responsive design for all devices
- All company branding and styling

### 🔧 Technical Benefits

- **FastAPI:** Modern, fast Python web framework
- **SQLAlchemy:** Robust database ORM with type safety
- **Pydantic:** Automatic data validation and serialization
- **JWT Authentication:** Secure token-based authentication
- **Auto Documentation:** Built-in Swagger/OpenAPI docs
- **Type Safety:** Full Python type hints throughout
- **Async Support:** Modern async/await patterns

### 📞 Support

Your AbleTools website is now powered by modern Python technology while maintaining all existing functionality and your company's professional appearance.

For technical support with the Python conversion, refer to the detailed code comments and API documentation at `/docs` when running the server.
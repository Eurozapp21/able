#!/usr/bin/env python3
"""
AbleTools cPanel Production Startup
Optimized for cPanel Python hosting environments
"""

import os
import sys
import logging
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('abletools.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def setup_environment():
    """Setup production environment variables"""
    
    # Production database URL (update if needed)
    os.environ.setdefault(
        'DATABASE_URL', 
        'postgresql://abletoolscom_dbengruser:dbengrpwd140725@localhost:5432/abletoolscom_dbengrweb'
    )
    
    # Security settings
    os.environ.setdefault('SECRET_KEY', '77e0c1e85f08d19d7e28b45e932676a5')
    os.environ.setdefault('DEBUG', 'False')
    os.environ.setdefault('PORT', '8000')
    os.environ.setdefault('HOST', '0.0.0.0')
    
    logger.info("Environment variables configured for production")

def initialize_database():
    """Initialize database with sample data"""
    try:
        from data_seeder import seed_data
        logger.info("Initializing database...")
        seed_data()
        logger.info("Database initialization completed")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        # Don't fail startup if seeding fails

def start_application():
    """Start the FastAPI application"""
    try:
        import uvicorn
        from main import app
        
        logger.info("Starting AbleTools Python server...")
        
        # Get configuration from environment
        host = os.getenv('HOST', '0.0.0.0')
        port = int(os.getenv('PORT', 8000))
        debug = os.getenv('DEBUG', 'False').lower() == 'true'
        
        # Start server
        uvicorn.run(
            app,
            host=host,
            port=port,
            log_level="info" if not debug else "debug",
            access_log=True
        )
        
    except Exception as e:
        logger.error(f"Failed to start application: {e}")
        sys.exit(1)

def main():
    """Main startup function for cPanel"""
    
    logger.info("🚀 Starting AbleTools Python Application")
    logger.info("📊 Database: PostgreSQL")
    logger.info("🌐 Framework: FastAPI")
    logger.info("🔐 Admin: admin/admin123")
    
    # Setup production environment
    setup_environment()
    
    # Initialize database
    initialize_database()
    
    # Start the application
    start_application()

if __name__ == "__main__":
    main()
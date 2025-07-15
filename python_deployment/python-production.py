#!/usr/bin/env python3
"""
AbleTools Python Production Server
Ready for deployment with your database configuration
"""

import os
import sys
import uvicorn
from pathlib import Path

# Add the python_server directory to the path
sys.path.insert(0, str(Path(__file__).parent.parent / "python_server"))

from main import app
from data_seeder import seed_data

def main():
    """Production server startup"""
    
    # Initialize database with sample data
    print("🚀 Initializing AbleTools Python Server...")
    try:
        seed_data()
        print("✅ Database initialized successfully")
    except Exception as e:
        print(f"⚠️  Database initialization: {e}")
    
    # Start production server
    print("🌐 Starting AbleTools Python API server...")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        log_level="info"
    )

if __name__ == "__main__":
    main()
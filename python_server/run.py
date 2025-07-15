#!/usr/bin/env python3
"""
AbleTools Python Server Startup Script
"""

import os
import sys
import uvicorn
from data_seeder import seed_data

def main():
    """Start the AbleTools Python server"""
    
    # Seed the database with initial data
    print("Seeding database with initial data...")
    seed_data()
    
    # Start the server
    print("Starting AbleTools Python server...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0", 
        port=8000,
        reload=True,
        reload_dirs=["python_server"]
    )

if __name__ == "__main__":
    main()
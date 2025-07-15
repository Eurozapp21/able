#!/bin/bash

# AbleTools Python Server Startup Script

echo "🐍 Starting AbleTools Python Server..."
echo "📊 Database: PostgreSQL"
echo "🌐 API: FastAPI"
echo "🔐 Admin: admin/admin123"
echo "📍 URL: http://localhost:8000"
echo ""

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Start the server
echo "🚀 Starting server..."
python python-production.py
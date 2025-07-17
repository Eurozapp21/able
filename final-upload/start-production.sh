#!/bin/bash

echo "🚀 Starting AbleTools Production Server..."
echo "=================================================="

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js version 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
echo "📦 Node.js version: $NODE_VERSION"

# Set production environment
export NODE_ENV=production

# Kill any existing processes on common ports
for port in 3000 3001 3002 3003; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Killing existing process on port $port"
        lsof -ti:$port | xargs kill -9 >/dev/null 2>&1
    fi
done

echo "🌐 Starting AbleTools server..."
echo "📊 Database: MySQL (configured in .env)"
echo "📁 Static files: ./client/"
echo "🖼️  Assets: ./attached_assets/"
echo ""

# Try to start the full server first, fallback to standalone
if node server/index.js 2>/dev/null; then
    echo "✅ Full server started successfully"
else
    echo "⚠️  Full server failed, starting standalone mode..."
    node standalone-server.js
fi
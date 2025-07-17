#!/bin/bash

echo "🚀 Starting AbleTools application..."

# Check if port is in use and offer to kill it
PORT=${PORT:-3001}
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port $PORT is already in use"
    echo "🔧 Running port cleanup..."
    ./kill-port.sh
    sleep 2
fi

# Set environment and start server
export NODE_ENV=production
echo "🌐 Starting server on port $PORT..."
node server/index.js
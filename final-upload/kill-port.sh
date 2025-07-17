#!/bin/bash

# Kill any process using port 3000 or 3001
echo "🔍 Checking for processes on ports 3000 and 3001..."

# Kill port 3000
PORT_3000_PID=$(lsof -ti:3000 2>/dev/null)
if [ ! -z "$PORT_3000_PID" ]; then
    echo "⚠️  Killing process on port 3000 (PID: $PORT_3000_PID)"
    kill -9 $PORT_3000_PID
    echo "✅ Port 3000 freed"
else
    echo "✅ Port 3000 is already free"
fi

# Kill port 3001
PORT_3001_PID=$(lsof -ti:3001 2>/dev/null)
if [ ! -z "$PORT_3001_PID" ]; then
    echo "⚠️  Killing process on port 3001 (PID: $PORT_3001_PID)"
    kill -9 $PORT_3001_PID
    echo "✅ Port 3001 freed"
else
    echo "✅ Port 3001 is already free"
fi

echo "🚀 Ready to start AbleTools server"
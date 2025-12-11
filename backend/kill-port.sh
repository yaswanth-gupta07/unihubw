#!/bin/bash
# Script to kill process on port 5000
# Usage: ./kill-port.sh 5000

PORT=${1:-5000}

echo "Finding process using port $PORT..."

PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "❌ No process found using port $PORT"
    exit 1
fi

echo "Found process ID: $PID"
echo "Killing process..."
kill -9 $PID
echo "✅ Process killed successfully!"


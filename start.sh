#!/bin/bash

# DryFruto - Start Script
# This script builds and runs the application using Docker Compose

echo "========================================"
echo "   DryFruto - Starting Application"
echo "========================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo "Error: Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

echo ""
echo "Step 1: Stopping any existing containers..."
docker compose down 2>/dev/null

echo ""
echo "Step 2: Building Docker images..."
docker compose build --no-cache

if [ $? -ne 0 ]; then
    echo "Error: Build failed. Check the logs above."
    exit 1
fi

echo ""
echo "Step 3: Starting containers..."
docker compose up -d

if [ $? -ne 0 ]; then
    echo "Error: Failed to start containers."
    exit 1
fi

echo ""
echo "Step 4: Waiting for services to be ready..."
sleep 10

echo ""
echo "========================================"
echo "   DryFruto is now running!"
echo "========================================"
echo ""
echo "Access your site at: http://localhost"
echo "Admin panel at: http://localhost/admin"
echo ""
echo "Useful commands:"
echo "  - View logs: docker compose logs -f"
echo "  - Stop app:  docker compose down"
echo "  - Restart:   docker compose restart"
echo ""

# Show container status
docker compose ps

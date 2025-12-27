#!/bin/bash

# DryFruto - Rebuild Script
# Use this after pulling new code from GitHub

echo "========================================"
echo "   DryFruto - Rebuilding Application"
echo "========================================"

echo ""
echo "Step 1: Pulling latest code..."
git pull origin main

echo ""
echo "Step 2: Stopping containers..."
docker compose down

echo ""
echo "Step 3: Rebuilding images..."
docker compose build --no-cache

echo ""
echo "Step 4: Starting containers..."
docker compose up -d

echo ""
echo "Step 5: Cleaning up old images..."
docker image prune -f

echo ""
echo "========================================"
echo "   Rebuild Complete!"
echo "========================================"
echo ""
echo "Access your site at: http://localhost"
echo ""

docker compose ps

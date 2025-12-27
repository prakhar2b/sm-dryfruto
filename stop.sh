#!/bin/bash

# DryFruto - Stop Script
# This script stops all running containers

echo "========================================"
echo "   DryFruto - Stopping Application"
echo "========================================"

docker compose down

echo ""
echo "All containers stopped."
echo "To start again, run: ./start.sh"

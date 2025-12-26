# DryFruto - Docker Deployment Guide

This guide explains how to deploy the DryFruto application using Docker on a Hostinger VPS.

## Prerequisites

- Hostinger VPS with Ubuntu 20.04 or later
- SSH access to your VPS
- GitHub repository with your DryFruto code
- Domain name (optional, can use IP address)

## Quick Start

### 1. Push Your Code to GitHub

In Emergent:
1. Click your profile icon → "Connect GitHub"
2. Authorize Emergent on GitHub
3. Click "Save to GitHub" button
4. Select repository and push

### 2. Run Docker Installation

SSH into your VPS and run:

```bash
# Download the install script
wget https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/deploy/docker-install.sh
chmod +x docker-install.sh
sudo ./docker-install.sh
```

### 3. Setup SSL (Recommended)

```bash
cd /var/www/dryfruto
sudo ./deploy/docker-ssl-setup.sh
```

## Docker Files Overview

| File | Description |
|------|-------------|
| `Dockerfile.backend` | FastAPI backend container |
| `Dockerfile.frontend` | React frontend build container |
| `docker-compose.yml` | Development setup |
| `docker-compose.prod.yml` | Production setup |
| `docker/nginx-proxy.conf` | Nginx configuration |

## Docker Commands

### Check Status
```bash
cd /var/www/dryfruto
docker-compose -f docker-compose.prod.yml ps
```

### View Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs

# Specific service
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs nginx
docker-compose -f docker-compose.prod.yml logs mongodb
```

### Restart Services
```bash
# Restart all
docker-compose -f docker-compose.prod.yml restart

# Restart specific service
docker-compose -f docker-compose.prod.yml restart backend
```

### Stop All Services
```bash
docker-compose -f docker-compose.prod.yml down
```

### Start Services
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Rebuild After Code Changes
```bash
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

## Updating Your Site

After making changes in Emergent:

1. Click "Save to GitHub" to push changes
2. SSH into your VPS
3. Run the update script:

```bash
cd /var/www/dryfruto
sudo ./deploy/docker-update.sh
```

## Environment Variables

### Root `.env` file
```
SITE_URL=http://your-domain.com
MONGO_URL=mongodb://mongodb:27017
DB_NAME=dryfruto
```

### Frontend `.env` file
```
REACT_APP_BACKEND_URL=http://your-domain.com
```

## Container Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Hostinger VPS                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│   │   Nginx     │    │   Backend   │    │  MongoDB    │    │
│   │  (Port 80)  │───▶│  (Port 8001)│───▶│ (Port 27017)│    │
│   │             │    │   FastAPI   │    │             │    │
│   └─────────────┘    └─────────────┘    └─────────────┘    │
│         │                                                   │
│         ▼                                                   │
│   ┌─────────────┐                                          │
│   │  React App  │                                          │
│   │   (Static)  │                                          │
│   └─────────────┘                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Volumes

| Volume | Purpose |
|--------|--------|
| `mongodb_data` | MongoDB database files |
| `uploads_data` | User uploaded images |

## Backups

### Create Backup
```bash
sudo ./deploy/docker-backup.sh
```

### Setup Automatic Backups
```bash
sudo crontab -e
# Add this line for daily backups at 2 AM:
0 2 * * * /var/www/dryfruto/deploy/docker-backup.sh
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Check if ports are in use
netstat -tlnp | grep -E '80|443|8001|27017'
```

### MongoDB connection issues
```bash
# Check if MongoDB is running
docker exec dryfruto-mongodb mongosh --eval "db.runCommand('ping')"

# View MongoDB logs
docker logs dryfruto-mongodb
```

### Nginx issues
```bash
# Test Nginx config
docker exec dryfruto-nginx nginx -t

# View Nginx logs
docker logs dryfruto-nginx
```

### Reset everything
```bash
cd /var/www/dryfruto
docker-compose -f docker-compose.prod.yml down -v
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

## Local Development with Docker

You can also run locally:

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Start with docker-compose
docker-compose up -d

# Access at http://localhost
```

## Support

For issues or questions, please create an issue in the GitHub repository.

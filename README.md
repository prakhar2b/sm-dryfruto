# DryFruto - Premium Dry Fruits E-Commerce

A full-stack e-commerce application for selling premium dry fruits, nuts, and seeds.

## Tech Stack

- **Frontend:** React + TailwindCSS + Shadcn UI
- **Backend:** FastAPI (Python)
- **Database:** MongoDB 6.0
- **Server:** Nginx (Reverse Proxy)
- **Containerization:** Docker + Docker Compose

---

## Quick Start (One Command)

```bash
# Clone the repository
git clone https://github.com/prakhar2b/client-dryfruto.git
cd client-dryfruto

# Start the application
./start.sh
```

Your site will be available at: **http://localhost** (or your server IP)

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `./start.sh` | Build and start all services |
| `./stop.sh` | Stop all running containers |
| `./rebuild.sh` | Pull latest code and rebuild |

---

## Manual Docker Commands

```bash
# Build and start
docker compose up -d --build

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend
docker compose logs -f nginx
docker compose logs -f mongodb

# Stop all services
docker compose down

# Restart services
docker compose restart

# Rebuild without cache
docker compose build --no-cache
docker compose up -d
```

---

## Project Structure

```
├── docker-compose.yml      # Main orchestration file
├── Dockerfile.backend      # Backend image (FastAPI)
├── Dockerfile.nginx        # Frontend image (React + Nginx)
├── nginx.conf              # Nginx configuration
├── start.sh                # Quick start script
├── stop.sh                 # Stop script
├── rebuild.sh              # Rebuild script
├── backend/                # FastAPI backend code
│   ├── server.py
│   └── requirements.txt
└── frontend/               # React frontend code
    ├── src/
    ├── package.json
    └── craco.config.js
```

---

## Docker Services

| Service | Container Name | Internal Port | External Port |
|---------|---------------|---------------|---------------|
| MongoDB | dryfruto-mongodb | 27017 | - |
| Backend | dryfruto-backend | 8001 | - |
| Nginx | dryfruto-nginx | 80 | **80** |

---

## Deploy on Hostinger VPS

### Option 1: Using Docker Manager (From GitHub)

1. Push code to GitHub
2. In Hostinger: **Docker → Docker Compose → Create New → From GitHub URL**
3. Enter: `https://github.com/prakhar2b/client-dryfruto.git`
4. Select branch: `main`
5. Click **Deploy**

### Option 2: Manual Deployment via SSH

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Clone repository
git clone https://github.com/prakhar2b/client-dryfruto.git
cd client-dryfruto

# Start the application
./start.sh
```

---

## Data Persistence

Docker volumes ensure your data persists across restarts:

- `mongodb_data` - Database files
- `uploads_data` - Uploaded product images

To backup data:
```bash
# Backup MongoDB
docker exec dryfruto-mongodb mongodump --out /data/backup

# Copy backup to host
docker cp dryfruto-mongodb:/data/backup ./backup
```

---

## Environment Variables

Configured automatically in `docker-compose.yml`:

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGO_URL` | `mongodb://mongodb:27017` | MongoDB connection |
| `DB_NAME` | `dryfruto` | Database name |

---

## Admin Panel

Access at: `http://your-domain/admin`

Features:
- Manage products and categories
- Update hero slides and testimonials
- Configure site settings (phone, email, social links)
- View form submissions (contact, bulk orders, careers)
- Update About Us page content

---

## Troubleshooting

### Build fails with cache error
```bash
docker builder prune -af
./start.sh
```

### Container won't start
```bash
docker compose logs -f
```

### Reset everything
```bash
docker compose down -v
docker system prune -af
./start.sh
```

---

## Support

For issues, create a GitHub issue or contact support.

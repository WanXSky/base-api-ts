# Base API

> Production-grade TypeScript API with Kubernetes, Docker, and GitOps automation. Currently running on Alibaba Cloud with 18+ days uptime.

**Live Service**: https://api.kzt.biz.id  
**Health Check**: `curl https://api.kzt.biz.id/health`  
**Uptime**: 18+ consecutive days  

---

## 🚀 Features

- **Express.js API** - Fast, minimalist web framework
- **TypeScript** - Type-safe development
- **PostgreSQL Database** - Persistent data with Prisma ORM
- **Docker Containerization** - Isolated, reproducible deployments
- **Kubernetes (k3s)** - Production orchestration on Alibaba Cloud
- **GitOps with ArgoCD** - Automatic deployments from Git commits
- **GitHub Actions CI/CD** - Automated build and push pipeline
- **SSL/TLS** - Automatic certificate management with cert-manager
- **JWT Authentication** - Secure API endpoints
- **API Documentation** - Built-in Swagger/OpenAPI
- **Zero-Downtime Deployments** - Automatic updates without service interruption

---

## 📋 Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js + TypeScript |
| **Framework** | Express.js |
| **Database** | PostgreSQL 15 |
| **ORM** | Prisma |
| **Container** | Docker |
| **Orchestration** | Kubernetes (k3s) |
| **Cloud** | Alibaba Cloud ECS |
| **Container Registry** | GitHub Container Registry (GHCR.io) |
| **GitOps** | ArgoCD + Image Updater |
| **CI/CD** | GitHub Actions |
| **SSL/TLS** | cert-manager + Let's Encrypt |
| **Ingress** | NGINX Ingress Controller |
| **API Docs** | Swagger/OpenAPI |

---

## 🏗️ Architecture

```
GitHub Repository
    │
    ├─→ GitHub Actions (Build & Push)
    │    └─→ Docker Build → GHCR.io
    │
    └─→ k3s Cluster (Alibaba Cloud)
         ├─→ ArgoCD (GitOps Controller)
         │   └─→ Watches GHCR.io for new images
         │
         ├─→ API Deployment (3 replicas)
         │   └─→ Express.js API pods
         │
         ├─→ Database Deployment
         │   └─→ PostgreSQL StatefulSet
         │
         └─→ NGINX Ingress
             ├─→ api.kzt.biz.id (SSL/TLS)
             └─→ argocd.kzt.biz.id (SSL/TLS)
```

### Deployment Flow

```
Developer: git push main
    ↓
GitHub Actions: Build Docker image + Push to GHCR.io
    ↓
ArgoCD Image Updater: Detect new image tag
    ↓
Update k3s manifests: k3s/api-deployment.yaml
    ↓
ArgoCD Controller: Sync and deploy
    ↓
k3s Cluster: Rolling update (zero downtime)
    ↓
Live at https://api.kzt.biz.id ✅
```

**Total deployment time**: ~2-3 minutes from push to live

---

## 📦 Project Structure

```
base-api-ts/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── authController.ts
│   │   ├── noteController.ts
│   │   └── userController.ts
│   ├── services/             # Business logic
│   │   ├── authService.ts
│   │   └── noteService.ts
│   ├── routes/               # API routes
│   │   ├── authRoute.ts
│   │   ├── noteRoute.ts
│   │   └── userRoute.ts
│   ├── middleware/           # Authentication & validation
│   │   ├── auth.ts
│   │   └── validate.ts
│   ├── schemas/              # Input validation
│   │   ├── userSchema.ts
│   │   └── noteSchema.ts
│   ├── utils/                # Helpers
│   │   ├── jwt.ts
│   │   ├── response.ts
│   │   └── generateSlug.ts
│   ├── swagger.ts            # API documentation
│   └── index.ts              # Entry point
│
├── prisma/
│   └── schema.prisma         # Database schema
│
├── k3s/                       # Kubernetes manifests
│   ├── api-deployment.yaml   # API deployment
│   ├── api-service.yaml      # Service definition
│   ├── api-ingress.yaml      # Ingress routing
│   ├── db-deployment.yaml    # PostgreSQL deployment
│   ├── db-service.yaml       # Database service
│   ├── db-pvc.yaml           # Persistent volume
│   ├── argocd-ingress.yaml   # ArgoCD ingress
│   └── issuer.yaml           # SSL certificate issuer
│
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions pipeline
│
├── Dockerfile                # Container configuration
├── docker-compose.yml        # Local development setup
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

---

## 🚀 Quick Start

### Prerequisites

- **Local Development**: Node.js 18+, Docker, Docker Compose
- **Production**: kubectl configured, k3s cluster, ArgoCD installed

### Option 1: Local Development

```bash
# Clone repository
git clone https://github.com/wanxsky/base-api-ts.git
cd base-api-ts

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
npx prisma migrate dev

# Run locally
npm run dev
```

API will be available at `http://localhost:3000`

### Option 2: Docker Compose

```bash
# Build and run
docker-compose up

# Database will initialize automatically
# API at http://localhost:3000
```

### Option 3: Kubernetes Deployment

```bash
# Prerequisites: k3s cluster + ArgoCD installed

# Apply all manifests
kubectl apply -f k3s/

# Monitor deployment
kubectl get deployments
kubectl get pods

# Check service
kubectl get svc | grep api-service
```

---

## 📡 API Endpoints

### Health Check

```bash
curl https://api.kzt.biz.id/health
```

Response:
```json
{
  "status": "OK",
  "db": "Connected"
}
```

### API Documentation

Full API documentation available at `/api-docs`:
- **Local**: http://localhost:3000/api-docs
- **Production**: https://api.kzt.biz.id/api-docs

Interactive Swagger UI for testing all endpoints.

### Example Endpoints

**Authentication**
```bash
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

**Users**
```bash
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
```

**Notes**
```bash
GET /api/notes
POST /api/notes
GET /api/notes/:id
PUT /api/notes/:id
DELETE /api/notes/:id
```

See Swagger documentation for full API details.

---

## 🔐 Environment Variables

### Required

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/base_api

# JWT Secret
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key

# Node environment
NODE_ENV=development
PORT=3000
```

### Optional

```env
# API Configuration
API_PREFIX=/api
LOG_LEVEL=info

# CORS
CORS_ORIGIN=*
```

---

## 📊 Monitoring

### Application Health

```bash
# Check API status
curl https://api.kzt.biz.id/health

# Expected response (healthy)
{"status":"OK","db":"Connected"}

# If database disconnected
{"status":"OK","db":"Disconnected"}
```

### Kubernetes Status

```bash
# Check deployments
kubectl get deployments
kubectl get pods

# Check logs
kubectl logs -f deployment/api --tail=100

# Check events
kubectl get events --sort-by='.lastTimestamp'
```

### ArgoCD Status

```bash
# Check application sync
kubectl get applications -n argocd
kubectl describe application base-api -n argocd

# Check image updater
kubectl logs -f deployment/argocd-image-updater-controller -n argocd
```

---

## 🔄 CI/CD Pipeline

### Automated Deployment

Every push to `main` branch triggers:

1. **GitHub Actions**
   - Checkout code
   - Build Docker image
   - Tag with commit SHA
   - Push to GHCR.io (ghcr.io/wanxsky/base-api)

2. **ArgoCD Image Updater**
   - Detects new image in GHCR.io
   - Updates k3s/api-deployment.yaml
   - Commits change to repository

3. **ArgoCD Controller**
   - Detects manifest change
   - Syncs new version
   - Deploys to k3s cluster

**Zero manual deployment steps.** Just push code.

### Manual Deployment (if needed)

```bash
# Force sync
kubectl -n argocd argocd app sync base-api

# Check sync status
kubectl describe application base-api -n argocd
```

---

## 🗄️ Database

### Schema

Managed by Prisma with PostgreSQL.

```bash
# View schema
cat prisma/schema.prisma

# Create migration
npx prisma migrate dev --name feature_name

# Reset database (development only)
npx prisma migrate reset
```

### Backup & Recovery

Database is running as StatefulSet with PersistentVolume.

```bash
# Get database pod
kubectl get pods | grep db

# Manual backup
kubectl exec -it <db-pod> -- pg_dump -U postgres base_api > backup.sql

# Restore
kubectl exec -it <db-pod> -- psql -U postgres base_api < backup.sql
```

---

## 🐳 Docker

### Build Image

```bash
docker build -t base-api:latest .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/base_api \
  -e JWT_SECRET=secret \
  base-api:latest
```

### Push to Registry

```bash
docker tag base-api:latest ghcr.io/wanxsky/base-api:latest
docker push ghcr.io/wanxsky/base-api:latest
```

---

## 🔗 Kubernetes

### Deploy to Cluster

```bash
# Apply all manifests
kubectl apply -f k3s/

# Verify deployments
kubectl get deployments
kubectl get services
kubectl get ingress

# Check pods
kubectl get pods -o wide
```

### Scaling

```bash
# Scale API deployment
kubectl scale deployment api --replicas=5

# Auto-scaling with HPA (if configured)
kubectl get hpa
```

### Rolling Updates

Updates handled automatically by ArgoCD with rolling deployment strategy.

```bash
# Monitor rolling update
kubectl rollout status deployment/api
kubectl rollout history deployment/api
```

---

## 🔒 Security

### SSL/TLS

- Automatic certificate provisioning with cert-manager
- Let's Encrypt integration
- Auto-renewal 30 days before expiration

```bash
# Check certificates
kubectl get certificate
kubectl describe certificate api-tls
```

### Authentication

JWT-based authentication with refresh tokens.

```bash
# Register user
curl -X POST https://api.kzt.biz.id/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Login
curl -X POST https://api.kzt.biz.id/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Use token
curl -H "Authorization: Bearer TOKEN" \
  https://api.kzt.biz.id/api/users
```

### Network Policies

Configure Kubernetes NetworkPolicies to restrict traffic (optional).

---

## 📈 Performance

### Uptime

- **Current**: 18+ consecutive days
- **Target**: 99.9% (< 43 minutes downtime/month)
- **SLA**: Production service commitment

### Response Times

- Health check: < 10ms
- API endpoints: < 100ms (p95)
- Database queries: < 50ms (p95)

### Scalability

Configured for horizontal scaling:

```bash
# Current replicas: 3
# Can scale to 10+ for high traffic
kubectl scale deployment api --replicas=10
```

---

## 🛠️ Development

### Code Style

- TypeScript strict mode
- ESLint configuration
- Prettier formatting

```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check
```

### Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Build

```bash
# Production build
npm run build

# Start production server
npm run start
```

---

## 📚 Documentation

### Additional Resources

- [Kubernetes Manifests](./k3s/) - k3s deployment configurations
- [Environment Setup](./docs/setup.md) - Detailed setup guide
- [API Documentation](https://api.kzt.biz.id/api-docs) - Interactive Swagger UI
- [Architecture](./docs/architecture.md) - System design documentation

---

## 🐛 Troubleshooting

### API not responding

```bash
# Check pod status
kubectl get pods | grep api

# Check logs
kubectl logs deployment/api

# Describe pod for errors
kubectl describe pod <pod-name>
```

### Database connection issues

```bash
# Check database pod
kubectl get pods | grep db

# Check database service
kubectl get svc | grep db

# Test connection
kubectl exec -it deployment/api -- psql $DATABASE_URL
```

### ArgoCD not syncing

```bash
# Check application status
kubectl describe application base-api -n argocd

# Manual sync
kubectl -n argocd argocd app sync base-api

# Check controller logs
kubectl logs -f deployment/argocd-application-controller -n argocd
```

---

## 📝 License

MIT License - see LICENSE file for details

---

## 👨‍💻 Author

**Ibnu Alwan Maulana**

- GitHub: [@wanxsky](https://github.com/wanxsky)
- Production Service: https://api.kzt.biz.id

---

## 💡 Contributing

Contributions welcome! This is a production service, so please:

1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m "feat: description"`
3. Push: `git push origin feature/feature-name`
4. Create Pull Request

All PRs automatically tested via GitHub Actions before merge.

---

**Last Updated**: May 2026  
**Uptime**: 18+ days  
**Status**: Production ✅

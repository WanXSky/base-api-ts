# Base API

> A TypeScript API that became a DevOps learning project. Started simple, progressively learned Docker, Kubernetes, and GitOps by actually building it.

**Live at**: https://api.kzt.biz.id  
**Uptime**: 18+ days  
**Status**: Learning project (not production-grade)

---

## 🎯 What This Is

A side project that started as a simple Express.js API and evolved into a hands-on learning experience with containerization, orchestration, and automated deployment.

### The Journey

```
Simple API
    ↓
"Let me containerize this" → Learned Docker
    ↓
"Docker works, why not try Kubernetes?" → Learned k3s
    ↓
"Manual deployment is tedious" → Learned GitHub Actions CI/CD
    ↓
"Found out about GitOps" → Implemented ArgoCD
    ↓
Now: Full automated pipeline, 18+ days uptime 🚀
```

**Key point**: Not planned as production system. Evolved through learning.

---

## 📋 What It Has

| Component | Status | Notes |
|-----------|--------|-------|
| **API** | ✅ Working | Express.js + TypeScript |
| **Database** | ✅ Working | PostgreSQL + Prisma |
| **Docker** | ✅ Working | Containerized |
| **Kubernetes** | ✅ Working | Running on k3s (18+ days) |
| **CI/CD** | ✅ Working | GitHub Actions → GHCR |
| **GitOps** | ✅ Working | ArgoCD auto-deployment |
| **SSL/TLS** | ✅ Working | cert-manager + Let's Encrypt |
| **API Docs** | ✅ Working | Swagger/OpenAPI |

---

## ❌ What It DOESN'T Have (Yet)

| Feature | Status | Impact |
|---------|--------|--------|
| **Testing** | ❌ Missing | No unit/integration tests |
| **Logging** | ❌ Missing | No structured logging |
| **Monitoring** | ❌ Missing | No alerts/metrics |
| **Backup Strategy** | ❌ Missing | No automated backups |
| **Security Scanning** | ❌ Missing | No dependency scanning |
| **Load Testing** | ❌ Missing | Unknown scalability limits |

**Honest take**: These would be needed for actual production use.

---

## 🚀 Quick Start

### Local Development

```bash
# Clone
git clone https://github.com/wanxsky/base-api-ts.git
cd base-api-ts

# Install
npm install

# Setup database
cp .env.example .env
npx prisma migrate dev

# Run
npm run dev
```

Open http://localhost:3000

### Docker

```bash
docker-compose up
```

### Kubernetes (requires k3s cluster)

```bash
kubectl apply -f k3s/
```

---

## 📡 API

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

### Full Documentation

Interactive docs: https://api.kzt.biz.id/api-docs

### Main Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users
POST   /api/notes
GET    /api/notes/:id
```

---

## 🏗️ Architecture

```
Developer pushes code
    ↓
GitHub Actions builds Docker image
    ↓
Pushes to GHCR.io
    ↓
ArgoCD detects new image
    ↓
Auto-updates k3s deployment
    ↓
Live on k3s cluster (Alibaba Cloud)
    ↓
Accessible at api.kzt.biz.id
```

**Deployment time**: ~2-3 minutes from push to live  
**Zero manual steps**: Just git push

---

## 📁 Project Structure

```
src/
├── controllers/      # HTTP handlers
├── services/        # Business logic
├── routes/          # API routes
├── middleware/      # Auth, validation
├── schemas/         # Input validation
├── utils/           # Helpers
└── index.ts         # Entry point

k3s/
├── api-deployment.yaml
├── api-service.yaml
├── api-ingress.yaml
├── db-deployment.yaml
├── db-pvc.yaml
└── argocd-*.yaml

.github/workflows/
└── ci.yml           # GitHub Actions pipeline
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL + Prisma |
| Container | Docker |
| Orchestration | Kubernetes (k3s) |
| Cloud | Alibaba Cloud ECS |
| Registry | GitHub Container Registry |
| CI/CD | GitHub Actions |
| GitOps | ArgoCD |
| SSL/TLS | cert-manager |
| Ingress | NGINX |

---

## 📊 Current Status

### Uptime
- **18+ consecutive days** without restart
- No monitoring/alerting configured (would help catch issues)

### Performance
- API response: ~50-100ms
- Database: Connected and responding
- No load testing done (don't know real limits)

### Security
- JWT authentication implemented
- HTTPS/SSL working
- No security scanning or penetration testing
- No rate limiting configured

---

## 🔄 How Deployment Works

### Current Workflow

1. **Code Push**
   ```bash
   git push origin main
   ```

2. **GitHub Actions (Automated)**
   - Builds Docker image
   - Tags with git SHA
   - Pushes to GHCR.io

3. **ArgoCD Image Updater (Automated)**
   - Detects new image in GHCR
   - Updates k3s manifests
   - Commits change to GitHub

4. **ArgoCD Controller (Automated)**
   - Detects manifest change
   - Syncs to cluster
   - Deploys new version

5. **Result**
   - New code live on cluster
   - **Zero manual intervention**

### Check Deployment

```bash
# See recent deployments
kubectl get deployments

# Check pods
kubectl get pods

# View logs
kubectl logs -f deployment/api

# Check ArgoCD sync
kubectl describe application base-api -n argocd
```

---

## 💾 Database

PostgreSQL running in k3s as StatefulSet with PersistentVolume.

```bash
# Connect to database
kubectl exec -it deployment/api -- psql $DATABASE_URL

# Create migration
npx prisma migrate dev --name feature_name

# View schema
cat prisma/schema.prisma
```

**Note**: No automated backups configured yet. Should add before using for critical data.

---

## 🐳 Docker

### Build

```bash
docker build -t base-api:latest .
```

### Run

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

## ☸️ Kubernetes

### Deploy

```bash
kubectl apply -f k3s/
```

### Monitor

```bash
# All resources
kubectl get all

# Just API
kubectl get deployment api
kubectl get svc api-service
kubectl get ingress api-ingress

# Real-time logs
kubectl logs -f deployment/api

# Events
kubectl get events --sort-by='.lastTimestamp'
```

### Scale (if needed)

```bash
kubectl scale deployment api --replicas=5
```

---

## 🔐 Authentication

Uses JWT with refresh tokens.

```bash
# Register
curl -X POST https://api.kzt.biz.id/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password"}'

# Login
curl -X POST https://api.kzt.biz.id/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password"}'

# Use token
curl -H "Authorization: Bearer TOKEN" \
  https://api.kzt.biz.id/api/users
```

See Swagger docs for more endpoints.

---

## 🚨 Known Issues & Gaps

### Testing
- No unit tests
- No integration tests
- No e2e tests
- Would help catch bugs early

### Monitoring & Alerting
- No metrics collection
- No alerting if API goes down
- No performance tracking
- Would need: Prometheus + Grafana

### Logging
- Using basic console.log
- No structured logging
- No centralized log collection
- Would help with debugging

### Backup & Recovery
- Database has no automated backups
- No disaster recovery plan
- No tested recovery procedure
- Could lose data if volume fails

### Security
- No rate limiting
- No request validation
- No OWASP scanning
- JWT secrets in environment

### DevOps
- No resource limits set
- No health checks configured
- No auto-scaling policies
- No load testing done

---

## 🎓 Learning Outcomes

By building this, I learned:

✅ Docker containerization basics  
✅ Kubernetes (k3s) deployment  
✅ CI/CD automation (GitHub Actions)  
✅ GitOps concepts (ArgoCD)  
✅ Container registries (GHCR)  
✅ SSL/TLS with cert-manager  
✅ Kubernetes manifests (YAML)  
✅ Infrastructure as Code  
✅ How to maintain a service  

---

## 🛣️ Next Steps to Make It Production-Ready

**Priority 1** (Easy wins):
- Add unit tests (Jest)
- Add structured logging
- Add error handling improvements

**Priority 2** (Medium effort):
- Add Prometheus monitoring
- Add Grafana dashboards
- Add automated alerts

**Priority 3** (Important for production):
- Add automated database backups
- Document disaster recovery
- Add rate limiting
- Add request validation

**Priority 4** (Nice to have):
- Load testing & scalability analysis
- Security scanning
- Multi-region setup

---

## 👨‍💻 For Hiring Managers

### What This Shows

✅ Can learn new technologies independently  
✅ Can implement DevOps concepts in practice  
✅ Can maintain a working service  
✅ Understands Docker, Kubernetes, CI/CD  
✅ Self-taught infrastructure knowledge  
✅ Problem-solving through hands-on learning  

### What This Doesn't Show

❌ Enterprise-grade production experience  
❌ Monitoring/alerting expertise  
❌ Disaster recovery procedures  
❌ Security hardening  
❌ Load testing/scalability  
❌ Formal testing practices  

### Honest Assessment

This is a **learning project that works**, not a **finished production system**.

It demonstrates:
- DevOps fundamentals ✅
- Practical K8s understanding ✅
- CI/CD knowledge ✅
- Ability to learn independently ✅

It's a good foundation for a junior DevOps role.

---

## 📝 Environment Variables

### Required

```env
DATABASE_URL=postgresql://user:password@localhost:5432/base_api
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
NODE_ENV=development
PORT=3000
```

### Optional

```env
API_PREFIX=/api
LOG_LEVEL=info
```

---

## 🛠️ Development

### Scripts

```bash
npm run dev        # Development mode
npm run build      # Build TypeScript
npm run start      # Production
npm run lint       # Linting (if configured)
npm run test       # Tests (if configured)
```

### Code Structure

- Controllers handle HTTP requests
- Services contain business logic
- Routes define endpoints
- Schemas validate inputs
- Middleware handles auth and validation

---

## 📚 Resources

- **API Docs**: https://api.kzt.biz.id/api-docs
- **GitHub**: https://github.com/wanxsky/base-api-ts
- **Live Service**: https://api.kzt.biz.id

---

## 💡 Contributing

This is a learning project, but PRs welcome:

```bash
git checkout -b feature/your-feature
git commit -m "feat: description"
git push origin feature/your-feature
```

All pushes to main trigger automated deployment via GitHub Actions.

---

## 📄 License

MIT License

---

## 🧠 Lessons Learned

**What went well:**
- Learning by doing worked better than reading docs
- Incremental improvements kept it interesting
- ArgoCD made deployments painless
- k3s is lightweight and great for learning

**What I'd do differently:**
- Add tests from the start
- Add logging earlier
- Plan monitoring before going live
- Document as I go

**Key insight:**
Building something that actually works is better than reading about how things should work.

---

**Last Updated**: May 2026  
**Project Status**: Active learning project  
**Uptime**: 18+ days  
**Next Goal**: Add monitoring & testing

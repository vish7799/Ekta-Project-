# EKTA ELECTRICAL WORKS - Development Workflow Guide

## Getting Started

### Prerequisites
- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MongoDB**: >= 6.0 (Local instance or MongoDB Atlas cluster)

---

## Local Development Execution

### 1. Install Dependencies
Run npm install in each sub-application directory:

```bash
# Install backend dependencies
cd backend && npm install

# Install public frontend dependencies
cd ../frontend && npm install

# Install admin CMS dependencies
cd ../admin && npm install
```

### 2. Launch Development Servers

From the root project directory, launch servers independently or via orchestrator scripts:

```bash
# Launch Backend REST API (runs on http://localhost:5000)
npm run dev:backend

# Launch Public Frontend (runs on http://localhost:3000)
npm run dev:frontend

# Launch Admin CMS (runs on http://localhost:3001)
npm run dev:admin
```

---

## Testing API Endpoints

You can verify the backend REST API health by opening:
`http://localhost:5000/api/v1/health`

Sample JSON Output:
```json
{
  "status": "ok",
  "uptime": 12.45,
  "timestamp": "2026-09-12T09:00:00.000Z",
  "service": "EKTA ELECTRICAL WORKS API v1"
}
```

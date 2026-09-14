# EKTA ELECTRICAL WORKS - Environment Configuration Guide

## Environment File Overview

The backend uses a single consolidated `.env` configuration file in `backend/.env`.
A template file `.env.example` is committed to git.

> [!WARNING]
> Never commit real production secrets or database credentials to git. `.env` is explicitly ignored in `.gitignore`.

---

## Variable Reference Table

| Key | Default (Dev) | Purpose | Required |
| :--- | :--- | :--- | :--- |
| `PORT` | `5000` | Express HTTP Listening Port | Yes |
| `NODE_ENV` | `development` | Runtime environment (`development`, `production`, `test`) | Yes |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/ekta_electricals` | MongoDB connection URI | Yes |
| `JWT_SECRET` | Secret String | Min 32-character secret key for JWT signatures | Yes |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime (e.g. `7d`, `24h`) | Yes |
| `CORS_ORIGIN` | `http://localhost:3000,http://localhost:3001` | Allowed origins allowed to call REST API | Yes |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limiter window in milliseconds | No |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max API calls allowed per window per IP | No |
| `AUTH_RATE_LIMIT_MAX_REQUESTS` | `5` | Max auth attempts per 15 mins | No |
| `MAX_FILE_SIZE_BYTES` | `5242880` | Max uploaded media file size (5MB) | No |

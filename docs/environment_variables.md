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
| `UPLOAD_DIR` | `./uploads` | Directory used for uploaded files; set this to a persistent disk mount in production | No |
| `CLOUDINARY_CLOUD_NAME` | Empty | Cloudinary cloud name | No |
| `CLOUDINARY_API_KEY` | Empty | Cloudinary API key | No |
| `CLOUDINARY_API_SECRET` | Empty | Cloudinary API secret | No |

### Production media storage

The backend uses Cloudinary when all three Cloudinary variables are set. Otherwise it stores media files on the local filesystem. On Render, the default filesystem is ephemeral, so local uploads can disappear after a restart or redeploy even though their MongoDB records remain.

For Cloudinary storage, set:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Redeploy after setting the variables. Existing files that were uploaded to the old local directory cannot be recovered by this application; they must be uploaded again unless a backup exists. Keep the API secret only in Render environment variables and never commit it.

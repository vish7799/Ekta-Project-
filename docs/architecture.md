# EKTA ELECTRICAL WORKS - System Architecture Document

## Overview & Principles

EKTA ELECTRICAL WORKS platform is built as a production-grade, decoupled three-application platform designed for high performance, modularity, security, and maintainability.

```
+------------------------------------+          +------------------------------------+
|          Public Frontend           |          |             Admin CMS              |
|        (React + Vite SPA)          |          |        (React + Vite SPA)          |
|      http://localhost:3000         |          |      http://localhost:3001         |
+------------------------------------+          +------------------------------------+
                   |                                               |
                   | REST API Requests                             | Authenticated REST API
                   v                                               v
+------------------------------------------------------------------------------------+
|                                Express REST API                                    |
|                    https://ekta-project-backend.onrender.com                       |
|         Middleware: Helmet | CORS | RateLimiter | MongoSanitize | JWT Auth          |
+------------------------------------------------------------------------------------+
                                           |
                                           v
+------------------------------------------------------------------------------------+
|                                 MongoDB Database                                   |
|                          mongodb://127.0.0.1:27017/ekta_electricals                |
+------------------------------------------------------------------------------------+
```

---

## Component Applications

### 1. Public Frontend (`frontend/`)
- **Framework**: React 18, Vite, React Router v6.
- **Styling**: Tailwind CSS with custom industrial engineering design system (Deep Industrial Blue/Navy, Amber accents, high-contrast slate).
- **Purpose**: High-speed, SEO-friendly, responsive corporate public website. Communicates corporate scale, Class-A licensing, and turnkey engineering capabilities.

### 2. Backend REST API (`backend/`)
- **Framework**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose ODM.
- **Purpose**: Centralized business logic, RESTful API endpoints (`/api/v1`), security middleware, file upload handling, and role-based data validation.

### 3. Admin CMS (`admin/`)
- **Framework**: React 18, Vite, React Router v6.
- **Styling**: Tailwind CSS dark admin console.
- **Purpose**: Secure management console for administrative users to edit pages, engineering services, project case studies, client partners, media assets, and view enquiries.

---

## Architectural Principles

1. **Strict Decoupling**: Frontend, Backend, and Admin are isolated applications with independent build pipelines and configuration manifests.
2. **No Hardcoded Data**: All dynamic website content (Services, Projects, Clients, Testimonials, Site Settings) is served via backend API endpoints.
3. **No Fake Data Policy**: Production schema models enforce genuine factual structures; placeholders indicate CMS availability without inventing claims.
4. **Security by Design**: Helmet HTTP headers, CORS whitelisting, rate limiting, NoSQL query sanitization, and JWT authentication with bcrypt hashing.

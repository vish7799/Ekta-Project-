# EKTA ELECTRICAL WORKS - Security & Authentication Policy

## Authentication Architecture

Admin CMS access relies on Stateless JSON Web Tokens (JWT) signed using SHA-256 HMAC secrets:

1. **Password Storage**: Passwords are never stored in plaintext. They are salted with 12 bcrypt rounds before database persistence (`User.js`).
2. **Token Format**: Bearer standard header (`Authorization: Bearer <token>`).
3. **Role-Based Authorization**: Middleware checks `req.user.role` against endpoint authorization requirements (`admin`, `editor`).

---

## Defensive Security Measures

### 1. HTTP Security Headers
Express relies on `helmet` middleware to set defensive HTTP headers:
- `Content-Security-Policy`
- `X-Frame-Options: SAMEORIGIN` (prevents clickjacking)
- `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
- `Strict-Transport-Security` (HSTS)

### 2. NoSQL Query Injection Protection
- `express-mongo-sanitize` strips out prohibited characters (`$` and `.`) from user inputs to prevent query operator injection.

### 3. Rate Limiting & Brute-Force Defense
- **API Limiter**: Max 100 requests per 15-minute window per IP.
- **Auth Limiter**: Max 5 failed login attempts per 15-minute window per IP.
- **Enquiry Limiter**: Max 5 enquiry submissions per hour per IP.

### 4. File Upload Safety
- Files submitted to `/api/v1/media/upload` are validated against strict MIME type whitelists (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`) and max file size limits (5 MB). SVG uploads are rejected because uploaded media is publicly served.

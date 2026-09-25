# Production Deployment Setup

## 1. Required production deployment architecture

Use a three-part deployment model:

- Public frontend website
- Admin CMS dashboard
- Backend API + MongoDB database

Recommended production hosting pattern:

- Frontend: Vercel or Netlify
- Admin: Vercel or separate hosting environment
- Backend: Render, Railway, DigitalOcean, VPS, or similar Node host
- Database: MongoDB Atlas
- Media storage: Cloudinary or persistent disk storage

## 2. Backend production configuration

Create a real production `.env` file for the backend based on the template in [backend/.env.production.example](../backend/.env.production.example).

### Essential values

- `NODE_ENV=production`
- `MONGODB_URI` pointing to MongoDB Atlas or your production cluster
- `JWT_SECRET` with at least 32 characters
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` for the initial admin account
- `CORS_ORIGIN` including the live frontend and admin domains
- `PUBLIC_SITE_URL`, `FRONTEND_URL`, `ADMIN_URL`
- `SMTP_*` settings for enquiry email delivery

### Important production note

The backend will refuse to run in production without a valid `MONGODB_URI` and a secure `JWT_SECRET` because of the validation in [backend/src/config/env.js](../backend/src/config/env.js).

## 3. Frontend production configuration

Set the frontend environment variable:

- `VITE_API_URL=https://your-backend-domain.com/api/v1`

Make sure the public site is pointing to the correct backend host instead of the default Render URL.

## 4. Admin production configuration

Set the admin site environment variable:

- `VITE_API_URL=https://your-backend-domain.com/api/v1`

The admin app should also use the live backend and must not fall back to the wrong remote URL.

## 5. Deployment checklist

### Backend
- [ ] Production `.env` configured
- [ ] MongoDB connected successfully
- [ ] JWT secret secure and valid
- [ ] Admin account provisioned
- [ ] Health endpoint works over HTTPS
- [ ] CORS allows only the approved domains
- [ ] SMTP sends enquiry emails correctly
- [ ] Uploaded media is persisted correctly

### Frontend
- [ ] Site loads on production domain
- [ ] Images and styles load correctly
- [ ] Contact form works
- [ ] All pages render without broken links

### Admin panel
- [ ] Login works with the production backend
- [ ] Dashboard loads correctly
- [ ] CRUD workflows work for services, projects, testimonials, and clients
- [ ] Media upload works in production
- [ ] Roles and permissions behave as expected

## 6. Production QA pass before client handover

Run one full live smoke test after deployment:

1. Open the public website
2. Submit an enquiry form
3. Check the email notification and customer acknowledgement
4. Log in to the admin dashboard
5. Create or edit a service/project/client
6. Upload media
7. Confirm the new content appears on the public site
8. Verify no console errors or API failures appear

## 7. Handover package for the client

Prepare and share:

- Live URLs for frontend and admin panel
- Admin email and password
- Backend API URL
- Hosting credentials if required by the client
- Support contact and escalation path
- Deployment and rollback notes
- CMS usage instructions

## 8. Final sign-off condition

Handover is only complete when the live environment passes the full end-to-end QA and all production secrets and credentials are documented and secured.


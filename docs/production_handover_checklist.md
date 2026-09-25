# Production Handover Checklist

## 1. Production readiness status

This project is buildable and boots locally, but it is not yet fully client-ready for production handover until the items below are completed and verified.

## 2. Required deployment configuration

### Backend environment
- [ ] Create a real production `.env` file for the backend using `backend/.env.example` as the template.
- [ ] Set a secure `JWT_SECRET` with at least 32 characters.
- [ ] Set `NODE_ENV=production`.
- [ ] Set a production `MONGODB_URI` for the live MongoDB cluster.
- [ ] Set `PORT` to the hosting platform value if required.
- [ ] Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` for the initial admin account.
- [ ] Make sure the password is at least 12 characters long.
- [ ] Set `CORS_ORIGIN` to the actual production frontend and admin domains.
- [ ] Set `FRONTEND_URL` and `ADMIN_URL` to the live domains.
- [ ] Confirm the API responds correctly over HTTPS and not only localhost.

### Media and uploads
- [ ] Decide whether uploads will use Cloudinary or persistent disk storage.
- [ ] If using local filesystem storage, ensure the storage path is persistent and not ephemeral.
- [ ] Set Cloudinary credentials if using Cloudinary.
- [ ] Verify uploaded images and PDFs still resolve correctly on production.

### Email and notifications
- [ ] Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD`.
- [ ] Set `MAIL_FROM` to a valid sender address.
- [ ] Set `ENQUIRY_NOTIFICATION_EMAIL` to the actual company inbox.
- [ ] Test enquiry submission end-to-end.
- [ ] Confirm acknowledgement emails work if enabled.

## 3. Client-facing deployment

### Frontend deployment
- [ ] Deploy the public website to the production domain.
- [ ] Set `VITE_API_URL` to the live backend API URL if needed.
- [ ] Confirm pages render on HTTPS.
- [ ] Test all major routes: home, about, services, projects, industries, clients, contact.
- [ ] Check all images, icons, and media load correctly.

### Admin deployment
- [ ] Deploy the admin application to its production domain.
- [ ] Ensure login works with the live backend.
- [ ] Verify role-based access works correctly for admin/editor roles.
- [ ] Confirm media upload, create, update, delete flows work on production.

## 4. Functional QA checklist

- [ ] Homepage loads and displays all required sections.
- [ ] Contact form submits successfully.
- [ ] Enquiry emails or notifications are received.
- [ ] CMS can create and publish content.
- [ ] Images and PDFs render correctly.
- [ ] 404 handling works as expected.
- [ ] Health endpoint responds successfully.
- [ ] API rate limiting does not block normal usage.
- [ ] Users cannot access unauthorized admin routes.

## 5. Security and operations

- [ ] Use a strong production database password and restricted DB access.
- [ ] Keep secrets out of git history and source code.
- [ ] Confirm `helmet`, CORS, and sanitization are active in production.
- [ ] Add monitoring or uptime checks.
- [ ] Create a backup strategy for MongoDB.
- [ ] Define a rollback plan for deployment issues.
- [ ] Document the production owner and support contact.

## 6. Client handover package

The client should receive:
- [ ] Live production URLs for the site and admin panel
- [ ] Admin login credentials
- [ ] Database and hosting access credentials (only if required by the client)
- [ ] Deployment notes and maintenance guide
- [ ] Support and escalation contact details
- [ ] Backup and restore process
- [ ] CMS usage instructions

## 7. Final sign-off

Production handover is complete only when all boxes above are checked and verified in a live environment.

### Sign-off fields
- Project owner: ______________________
- Client contact: ______________________
- Deployment date: ______________________
- Approved by: ______________________
- Notes: ______________________

## 8. Recommended next action

Complete the deployment environment setup first, then perform one full end-to-end live QA pass before client handover.

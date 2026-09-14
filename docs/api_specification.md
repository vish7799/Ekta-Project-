# EKTA ELECTRICAL WORKS - REST API Specification

## Base URL
All API v1 endpoints are served under:
`http://localhost:5000/api/v1`

---

## Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Public (Rate Limited) | Authenticates admin user and returns JWT bearer token |
| `GET` | `/auth/me` | Protected (JWT) | Fetches current user profile |
| `POST` | `/auth/logout` | Protected (JWT) | Clears session token state |

---

## Services Endpoints (`/api/v1/services`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/services` | Public | Returns list of published engineering services |
| `GET` | `/services/slug/:slug` | Public | Returns details of a specific published service |
| `GET` | `/services/admin/all` | Admin / Editor | Returns all service records regardless of status |
| `POST` | `/services` | Admin / Editor | Creates a new engineering service offering |
| `PUT` | `/services/:id` | Admin / Editor | Updates service parameters or status |
| `DELETE` | `/services/:id` | Admin Only | Deletes a service record |

---

## Projects Endpoints (`/api/v1/projects`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects` | Public | Returns list of published portfolio project case studies |
| `GET` | `/projects/slug/:slug` | Public | Returns detail view of a project case study |
| `GET` | `/projects/admin/all` | Admin / Editor | Returns all project records |
| `POST` | `/projects` | Admin / Editor | Registers a new completed or active project |
| `PUT` | `/projects/:id` | Admin / Editor | Updates project scope or status |
| `DELETE` | `/projects/:id` | Admin Only | Removes a project record |

---

## Industries Endpoints (`/api/v1/industries`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/industries` | Public | Returns published industry sectors |
| `GET` | `/industries/slug/:slug` | Public | Returns industry sector overview |
| `POST` | `/industries` | Admin / Editor | Creates new industry sector profile |

---

## Enquiry Endpoints (`/api/v1/enquiries`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/enquiries` | Public (Rate Limited) | Submits a new project quotation request |
| `GET` | `/enquiries` | Admin / Editor | Lists submitted client enquiries |
| `PUT` | `/enquiries/:id` | Admin / Editor | Updates enquiry review status and admin notes |
| `DELETE` | `/enquiries/:id` | Admin Only | Removes enquiry record |

---

## Site Settings & Media (`/api/v1/site-settings`, `/api/v1/media`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/site-settings` | Public | Returns global branding, contact lines, address |
| `PUT` | `/site-settings` | Admin Only | Updates global corporate site settings |
| `GET` | `/media` | Admin / Editor | Lists uploaded media files |
| `POST` | `/media/upload` | Admin / Editor | Uploads image or document with type/size validation |
| `DELETE` | `/media/:id` | Admin Only | Safely unlinks and deletes media file |

# EKTA ELECTRICAL WORKS - Database Schema & Data Models

## Mongoose ODM Architecture

All database interaction is managed through Mongoose models in `backend/src/models/`.

---

## Model Specifications

### 1. User (`User.js`)
- `name`: String (Required, max 100)
- `email`: String (Required, Unique, Lowercase, Indexed)
- `password`: String (Required, Min 8, Select: false, Hashed via bcryptjs)
- `role`: Enum ['admin', 'editor'] (Default: 'admin')
- `status`: Enum ['active', 'suspended'] (Default: 'active')
- `lastLoginAt`: Date
- `timestamps`: true

### 2. Page (`Page.js`)
- `title`: String (Required, max 200)
- `slug`: String (Required, Unique, Indexed)
- `summary`: String (max 500)
- `content`: Mixed (Section blocks or structured markdown)
- `status`: Enum ['draft', 'published', 'archived'] (Indexed)
- `seo`: Object (metaTitle, metaDescription, keywords, canonicalUrl, ogImage)
- `timestamps`: true

### 3. Service (`Service.js`)
- `title`: String (Required, max 150)
- `slug`: String (Required, Unique, Indexed)
- `shortDescription`: String (Required, max 300)
- `fullDescription`: String
- `icon`: String
- `featuredImage`: ObjectId -> ref 'Media'
- `keyFeatures`: Array of Strings
- `specifications`: Array of Objects `{ label, value }`
- `displayOrder`: Number (Default 0, Indexed)
- `status`: Enum ['draft', 'published', 'archived'] (Indexed)
- `seo`: Object (metaTitle, metaDescription, keywords)
- `timestamps`: true

### 4. Project (`Project.js`)
- `title`: String (Required, max 200)
- `slug`: String (Required, Unique, Indexed)
- `clientName`: String
- `industry`: ObjectId -> ref 'Industry'
- `serviceCategory`: ObjectId -> ref 'Service'
- `location`: String
- `completionDate`: Date
- `summary`: String (max 400)
- `description`: String
- `highlights`: Array of Strings
- `featuredImage`: ObjectId -> ref 'Media'
- `gallery`: Array of ObjectIds -> ref 'Media'
- `isFeatured`: Boolean (Default false, Indexed)
- `status`: Enum ['draft', 'published', 'archived'] (Indexed)
- `seo`: Object
- `timestamps`: true

### 5. Industry (`Industry.js`)
- `name`: String (Required, Unique, max 100)
- `slug`: String (Required, Unique, Indexed)
- `shortDescription`: String (max 300)
- `overview`: String
- `solutionsProvided`: Array of Strings
- `featuredImage`: ObjectId -> ref 'Media'
- `displayOrder`: Number (Default 0, Indexed)
- `status`: Enum ['draft', 'published', 'archived'] (Indexed)

### 6. Client (`Client.js`)
- `name`: String (Required, max 150)
- `logo`: ObjectId -> ref 'Media'
- `websiteUrl`: String
- `industrySector`: String
- `displayOrder`: Number (Default 0, Indexed)
- `status`: Enum ['draft', 'published', 'archived'] (Default 'published')

### 7. Testimonial (`Testimonial.js`)
- `clientName`: String (Required)
- `designation`: String
- `companyName`: String (Required)
- `statement`: String (Required, max 1000)
- `rating`: Number (1 to 5, Default 5)
- `avatar`: ObjectId -> ref 'Media'
- `projectRef`: ObjectId -> ref 'Project'
- `displayOrder`: Number (Default 0)
- `status`: Enum ['draft', 'published', 'archived']

### 8. Media (`Media.js`)
- `originalName`: String
- `fileName`: String (Unique)
- `mimeType`: String
- `sizeBytes`: Number
- `filePath`: String
- `altText`: String
- `caption`: String
- `uploadedBy`: ObjectId -> ref 'User'

### 9. Enquiry (`Enquiry.js`)
- `fullName`: String (Required)
- `email`: String (Required)
- `phone`: String (Required)
- `companyName`: String
- `serviceRequested`: String
- `subject`: String (Required)
- `message`: String (Required)
- `status`: Enum ['new', 'in-review', 'contacted', 'closed'] (Indexed)
- `ipAddress`: String

### 10. SiteSettings (`SiteSettings.js`)
- Singleton model storing corporate branding, address, phone lines, emergency contacts, and global SEO metadata defaults.

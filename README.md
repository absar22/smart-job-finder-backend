# Backend README

# Smart Job Finder Backend

Backend API for Smart Job Finder built with Node.js, Express, MongoDB, and Cloudinary.

---

## Features

* User authentication
* JWT cookie authentication
* Protected routes
* Profile image upload with Cloudinary
* Job CRUD APIs
* Pagination support
* Dynamic slug support
* Express security middleware
* Rate limiting

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* Cloudinary
* Helmet
* Morgan
* Express Rate Limit

---

## Installation

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the backend root:

```env
PORT=
MONGO_URI=
JWT_SECRET=
CORS_ORIGIN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Main API Routes

### Auth Routes

```http
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout
PUT /api/auth/upload-profile
```

### Job Routes

```http
GET /api/jobs
GET /api/jobs/:slug
POST /api/jobs
PUT /api/jobs/:id
DELETE /api/jobs/:id
```

---

## Security Features

* HTTP-only cookies
* Helmet middleware
* Rate limiting
* Password hashing with bcrypt
* Protected middleware routes

---

## Future Improvements

* Save jobs feature
* Resume uploads
* Applied jobs tracking
* Admin dashboard
* Notifications

# Frontend README

# Smart Job Finder Frontend

Frontend application for Smart Job Finder built with Next.js, TypeScript, Tailwind CSS, and Redux Toolkit Query.

---

## Features

* User authentication UI
* Protected dashboard
* Job listing pages
* Pagination
* Dynamic job detail pages
* Apply button logic
* User dropdown menu
* Profile image upload
* Responsive design

---

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* Redux Toolkit
* Redux Toolkit Query

---

## Installation

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Frontend Features

### Authentication

* Signup page
* Login page
* Persistent user state
* Logout functionality

### Jobs

* Browse all jobs
* Dynamic slug routes
* View detailed job information
* Apply to jobs through external links

### User Profile

* Upload profile image
* Dropdown profile menu
* User initials fallback avatar

---

## State Management

Redux Toolkit Query is used for:

* Authentication APIs
* Job APIs
* Profile upload APIs
* API caching
* Loading and error states

---

## Future Improvements

* Save jobs system
* Resume upload
* Edit profile page
* Applied jobs tracking
* Dark mode
* Search and filtering

# Backend Project

This project is a Node.js backend built with Express, TypeScript, and Drizzle ORM. It provides a RESTful API for managing blog posts, hero sections, about us content, and file uploads. The backend is designed for extensibility and can be used as the server-side of a personal portfolio or content management system.

## Features
- User authentication (JWT-based)
- Blog management (CRUD)
- Hero section management
- About Us section management
- File upload support (Multer)
- PostgreSQL database integration (Drizzle ORM)

## Requirements
- Node.js (v18 or higher recommended)
- PostgreSQL

## Setup

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your database and JWT settings.

4. **Run database migrations:**
   ```sh
   npm run db:push
   ```

5. **Start the development server:**
   ```sh
   npm run dev
   ```

The server will start on the port specified in your `.env` file (default: 3005).

## Folder Structure
- `src/` — Main source code
- `src/modules/` — Feature modules (blog, hero, aboutUs, auth, etc.)
- `src/common/middleware/` — Custom Express middlewares
- `src/db/` — Database schema, models, and seed scripts
- `uploads/` — Uploaded files (images, etc.)

## API Endpoints
- `/api/auth` — Authentication routes
- `/api/blog` — Blog management
- `/api/hero` — Hero section management
- `/api/about` — About Us section management

## Notes
- Uploaded files are stored in the `uploads/` directory.
- Make sure your PostgreSQL server is running and accessible.
- For production, review security settings and environment variables.

---

For any issues, please open an issue in the repository.

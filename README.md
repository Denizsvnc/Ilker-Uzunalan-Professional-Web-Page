# Project Overview

This repository contains the full-stack implementation of a content management and portfolio system. The backend is built with Node.js, Express, TypeScript, and Drizzle ORM, while the frontend (if present) can be developed separately. The backend provides RESTful APIs for authentication, blog management, hero and about us sections, and file uploads.

## Main Features
- Modular backend structure
- JWT-based authentication
- Blog, hero, and about us management
- File upload support
- PostgreSQL database integration

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd ilker_uzunalan
   ```

2. **Backend setup:**
   ```sh
   cd backend
   npm install
   cp .env.example .env # Fill in your environment variables
   npm run db:push
   npm run dev
   ```

3. **Frontend setup (if available):**
   - Follow the instructions in the frontend directory (if exists).

## Folder Structure
- `backend/` — Backend API and business logic
- `uploads/` — Uploaded files (images, etc.)
- (Optional) `frontend/` — Frontend application

## Requirements
- Node.js (v18+)
- PostgreSQL

## Notes
- Make sure to configure your environment variables before running the backend.
- Uploaded files are stored in the `uploads/` directory.
- For production, review security and environment settings.

---

For issues or contributions, please open an issue or pull request in this repository.

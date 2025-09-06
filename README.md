
---

## 📘 Backend (README.md)

```md
# ⚙️ LMS Backend (API)

The backend API for the LMS project built with **Express.js, MongoDB, TypeScript, and Zod**.  
Provides all endpoints required by the frontend: courses, modules, lectures, progress, and authentication.

---

## 🚀 Features

- 🔑 Admin authentication with JWT
- 📚 Course management (CRUD)
- 📦 Module management (CRUD)
- ▶️ Lecture management (CRUD with PDFs & video links)
- ✅ Track user progress
- 🧩 Request validation with **Zod**
- 🌍 CORS configured (Vercel-ready)
- 🔄 MongoDB Atlas connection

---

## 🛠️ Tech Stack

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/) – request validation
- [JWT](https://jwt.io/) – authentication
- [Vercel](https://vercel.com/) – deployment

---

## ⚡ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/lms-system-backend.git
cd lms-system-backend

2. Install dependencies
npm install

3. Configure Environment

Create a .env file:

PORT=4000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=supersecret
ALLOW_ORIGIN=*

4. Run locally
npm run dev


Backend will run at: http://localhost:4000

📦 Deployment

Deploy easily on Vercel

Already configured with vercel.json and server.ts

Health check available:

/ → { "message": "Backend is running 🚀" }

/health → { "ok": true }

📡 API Endpoints

POST /auth/login → Admin login

GET /courses → List all courses

POST /courses → Create course

PATCH /courses/:id → Update course

DELETE /courses/:id → Delete course

GET /modules?course=... → Get modules

GET /lectures?course=... → Get lectures

POST /progress/complete → Mark lecture completed

🔑 Test Credentials
Email: admin@demo.com
Password: admin123

👨‍💻 Author

Developed by Mamun 🚀

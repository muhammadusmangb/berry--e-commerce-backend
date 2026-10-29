<<<<<<< HEAD
# Berry Admin Backend (Node + Express + MongoDB)

## Run
1. Install Node.js and MongoDB (or use a free MongoDB Atlas cluster).
2. `cp .env.example .env` (Windows: copy .env.example .env) and edit MONGO_URI / JWT_SECRET.
3. `npm install`
4. `npm run seed`   (creates admin info@gmail.com / 123456 + sample data)
5. `npm run dev`    -> http://localhost:5000

## API (all except auth + /api/contact need header `Authorization: Bearer <token>`)
- POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- GET /api/stats
- CRUD (GET list ?search=&sort=&page=&limit=, GET/PUT/DELETE /:id, POST):
  /api/customers /api/orders /api/invoices /api/products /api/posts
  /api/users and /api/messages (admin only)
- POST /api/contact (public)

## Frontend
Copy frontend-integration/api.js into berry-admin/src and use login() on the Login page.
=======
# berry--e-commerce-backend
# Berry Dashboard & E-Commerce Web Submission

This repository contains the integrated Node.js/Express backend for both the **Berry Dashboard** and **E-Commerce Web** projects. The application utilizes an in-memory MongoDB instance configured to automatically seed test data upon startup.

---

## 🔗 Frontend Projects & Live Links
* **Berry Dashboard Frontend:** [Insert Berry Repo / Live Link Here]
* **E-Commerce Web Frontend:** [Insert E-Commerce Repo / Live Link Here]

---

## 🚀 Backend Configuration
* **Server Port:** `5001`
* **Database:** In-Memory MongoDB (Auto-seeded)
* **Default Admin Credentials:**
  * **Email:** `info@gmail.com`
  * **Password:** `123456`

---

## 🛠️ How to Run Locally

1. Clone this repository:
   ```bash
   git clone [https://github.com/muhammadusmangb/berry--e-commerce-backend.git](https://github.com/muhammadusmangb/berry--e-commerce-backend.git)
   cd berry--e-commerce-backend
>>>>>>> 5fe403dc73eb0cfe432ea9118b8a08217eeace29

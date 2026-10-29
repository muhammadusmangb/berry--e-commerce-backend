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

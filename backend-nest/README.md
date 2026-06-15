# FutureTech NestJS Backend

NestJS migration of the FutureTech Next.js API. Uses the same SQLite database and Prisma schema as `../backend`.

## Quick start

```bash
cd backend-nest
npm install
npm run start:dev
```

API base URL: `http://localhost:3001/api`

## Environment

Copy `.env.example` to `.env`. By default, `DATABASE_URL` points to the existing database at `../backend/prisma/dev.db`.

```env
DATABASE_URL="file:../backend/prisma/dev.db"
JWT_SECRET="your-secret-key"
PORT=3001
FRONTEND_URL="http://localhost:5173"
```

## Project structure

```
src/
├── auth/           JWT login & register
├── users/          Profile endpoints
├── posts/          User posts, comments, likes, shares
├── blog/           Blog content
├── news/           News articles
├── videos/         Video library
├── podcasts/       Podcast shows & episodes
├── resources/      Resource highlights & tabs
├── testimonials/   Testimonials
├── faqs/           FAQs
├── similar-news/   Similar news items
├── stats/          Site statistics
├── contacts/       Contact form
├── newsletters/    Newsletter subscriptions
├── admin/          Admin dashboard & management
├── prisma/         Prisma service
└── common/         Guards, filters, decorators
```

## Migrated endpoints

All routes from the Next.js backend under `/api/*` are available with the same paths and response shapes.

| Area | Routes |
|------|--------|
| Auth | `POST /api/auth/login`, `POST /api/auth/register` |
| Profile | `GET/PUT /api/users/profile` |
| Posts | `GET/POST /api/posts`, `GET/DELETE /api/posts/:id` |
| Social | comments, likes, share under `/api/posts/:id/*` |
| Content | blogs, news, videos, podcasts, resources, testimonials, faqs, similar-news, stats |
| Forms | `POST /api/contact`, `POST/GET /api/newsletter` |
| Admin | `/api/admin/*` (requires `role: admin` JWT) |

## Switch from Next.js backend

1. Stop the Next.js backend on port 3001
2. Start this NestJS server: `npm run start:dev`
3. Update frontend API base URL if needed (same port 3001 by default)

## Scripts

- `npm run start:dev` — development with hot reload
- `npm run build` — compile TypeScript
- `npm run start:prod` — run compiled app
- `npm run db:generate` — regenerate Prisma client

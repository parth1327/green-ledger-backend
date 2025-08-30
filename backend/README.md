# Green Ledger Backend (Express + MongoDB)

This is a standalone backend for the Green Ledger dashboard. It provides REST APIs for categories, accounts, transactions, budgets, and stats.

## Setup

1) Copy environment variables
- Duplicate `.env.example` to `.env` and set values.

2) Start MongoDB (optional via Docker)
- docker compose -f backend/docker-compose.yml up -d

3) Install and run
- cd backend
- npm install
- npm run dev

4) Seed sample data
- npm run seed

## Key Endpoints

- GET /api/health
- Categories:
  - GET /api/categories
  - POST /api/categories
  - PATCH /api/categories/:id
  - DELETE /api/categories/:id
- Accounts:
  - GET /api/accounts
  - POST /api/accounts
  - PATCH /api/accounts/:id
  - DELETE /api/accounts/:id
- Transactions:
  - GET /api/transactions?from=2025-01-01&to=2025-12-31&page=1&limit=20&sort=-date
  - POST /api/transactions
  - PATCH /api/transactions/:id
  - DELETE /api/transactions/:id
- Budgets:
  - GET /api/budgets
  - POST /api/budgets
  - DELETE /api/budgets/:id
- Stats:
  - GET /api/stats/overview?from=YYYY-MM-DD&to=YYYY-MM-DD
  - GET /api/stats/by-category?from=YYYY-MM-DD&to=YYYY-MM-DD
  - GET /api/stats/monthly?months=6

## Frontend Integration

- Set `CORS_ORIGIN` to your frontend URL (e.g., http://localhost:3000).
- Point your frontend to `http://localhost:4000/api`.

## Notes

- Tech stack: Express, Mongoose, Zod validation, Helmet, CORS, Morgan, and rate limiting.
- Authentication is not included; if you need auth, we can add JWT-based auth or integrate with your existing system.

# GitHub Repo CRM

A full-stack project designed to track, synchronize, and manage public GitHub repositories.
Built with a focus on **scalable architecture** and **background processing**.



## ✨ Key Features

- **Secure Authentication:** JWT-based auth using **HTTP-only Cookies** strategy.
- **Background Synchronization:** Heavy GitHub API tasks are offloaded to **Redis queues (BullMQ)**.
- **Real-time Updates:** **Server-Sent Events (SSE)** provide live feedback on synchronization status.
- **Dockerized:** Fully containerized environment (App, DB, Redis) with easy setup.
- **Auto-Seeding:** Database is automatically populated with demo data on the first run.

-----

## 🛠 Tech Stack

- **NestJS:** Chosen for its strict modular architecture and Dependency Injection, ensuring the backend is scalable.
- **Next.js 16 (App Router):** Leveraged for **Server Components** and **Middleware** (secure server-side route protection via Cookies).
- **BullMQ (Redis):** For handling GitHub API requests asynchronously without blocking the main thread.
- **PostgreSQL:** Selected for relational data integrity (User <-> Projects).
- **TanStack Query & Zustand:**
    - **Query:** efficient server-state caching and optimistic updates.
    - **Zustand:** lightweight client-state management.

---

## 🚀 Getting Started


### 1. Environment Setup

The project includes a `.env.example` file with all necessary default values for a quick start.

Simply copy it to `.env`:

```bash
# API Config
cp .env.api.example .env.api

# Database Config
cp .env.postgress.example .env.postgress
```

### 2\. Run with Docker

Build and start the entire system with a single command:

```bash
docker-compose up -d --build
```

- **Backend:** `http://localhost:80/api`
- **Frontend:** `http://localhost:80`

> **Note:** On the first launch, the `SeedService` will **automatically seed** the database with a test user (`test@example.com` / `password`) and popular repositories.

### 3\. Run Locally

If you want to run apps individually:

```bash
# Install dependencies
pnpm install

# Start database & redis
docker-compose up postgres redis -d

# Start Backend (Terminal 1)
pnpm --filter api dev

# Start Frontend (Terminal 2)
pnpm --filter web dev
```

-----

## 📂 Project Structure

### Backend (`apps/api`)

```text
src/
├── config/             # Global configuration (DB, Redis, CORS)
├── infrastructure/     # External services (GitHub API integration)
├── lib/                # Shared types and helpers
├── modules/
│   ├── auth/           # JWT, Guards, Session decorators
│   ├── user/           # User management
│   ├── project/        # Core logic: CRUD, Queue Producers, Events
│   ├── queue/          # BullMQ Processors (Workers)
│   └── seed/           # Database seeding logic
└── main.ts             # App bootstrap
```

### Frontend (`apps/web`)

```text
src/
├── app/
│   ├── (auth)/         # Login/Signup routes (Auth Layout)
│   ├── (main)/         # Dashboard routes (Protected Layout)
│   └── api/            # Next.js API routes (if any)
├── components/         # Shared UI components (shadcn/ui)
├── features/           # Business logic grouped by domain
│   ├── auth/           # Hooks, Queries, Schemas for Auth
│   └── project/        # Hooks, Queries, Stores for Projects
├── lib/                # Axios client, React Query setup
└── middleware.ts       # Edge middleware for route protection
```
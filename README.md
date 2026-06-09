# PACE (Predictive AI Cargo Exchange)

PACE is a full-stack logistics optimization platform that reduces empty truck miles by matching shipments with the best available trucks and drivers.

## Stack

- Frontend: Next.js 15, TypeScript, Tailwind CSS, Recharts, Leaflet, Axios
- Backend: FastAPI, SQLAlchemy ORM, JWT auth
- Database: PostgreSQL
- Migrations: Alembic
- Containers: Docker and Docker Compose

## Project Layout

- `frontend/` Next.js app with route pages for login, register, dashboard, shipments, trucks, drivers, tracking, analytics, and admin.
- `backend/` FastAPI app with routers, schemas, services, matching engine, AI helpers, and models.
- `data/` JSON fixtures for local seed data.
- `docs/` architecture and API notes.
- `alembic.ini` and `backend/alembic/` database migrations.

## Local Setup

1. Create a Python environment and install the backend dependencies.
2. Install the frontend dependencies with npm.
3. Start PostgreSQL, then run the migrations.
4. Seed the database with the demo data.
5. Start the backend and frontend dev servers.

## Backend

```bash
pip install -r requirements.txt
alembic -c alembic.ini upgrade head
python backend/seed.py
uvicorn backend.app.main:app --reload --port 8000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Docker

```bash
docker compose up --build
```

## Demo Credentials

- `user@pace.local` / `password123`
- `ops@pace.local` / `password123`

## Notes

- The backend supports JWT login, CRUD for all core entities, matching, analytics, and tracking endpoints.
- The frontend uses reusable mock data and axios services so it can run before the backend is fully populated.

## Audit & Seed Actions (performed)

- Created `tools/generate_seed_data.py` to produce realistic Indian logistics seed data in `data/`.
- Generated datasets: `companies.json` (20), `users.json` (100), `trucks.json` (100), `drivers.json` (50), `shipments.json` (1000), `gps_logs.json` (5000), `payments.json` (empty).
- Verified SQLAlchemy models under `backend/app/models/` and Alembic migration `backend/alembic/versions/0001_initial_schema.py` are consistent.
- Ensured `.env` exists with a `DATABASE_URL` targeting the Docker `db` service.

## Next Steps (run locally)

1. Build and bring up services with Docker Desktop:

```powershell
docker compose up --build
```

2. Or run migrations & seed locally:

```powershell
pip install -r requirements.txt
alembic -c alembic.ini upgrade head
python backend/seed.py
uvicorn backend.app.main:app --reload --port 8000
```

3. Frontend:

```bash
cd frontend
npm install
npm run dev
```

If you run into issues starting containers here, please paste the logs and I'll fix any remaining problems.

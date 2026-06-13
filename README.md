# PACE (Predictive AI Cargo Exchange)

## Overview

PACE is an Agentic AI-powered logistics optimization platform designed to reduce empty truck miles by intelligently matching available truck capacity with nearby shipment requests.

Every day, thousands of freight vehicles complete deliveries and return empty to their home base or next operational hub. These empty return journeys, commonly known as "deadhead miles," result in wasted fuel, higher operational costs, reduced fleet utilization, and unnecessary carbon emissions.

PACE addresses this challenge through AI-powered freight matching, route intelligence, fleet analytics, and sustainability monitoring. The platform helps logistics providers maximize vehicle utilization while enabling businesses to access affordable transportation capacity.

---

## Problem Statement

Commercial freight carriers frequently travel empty after completing deliveries due to fragmented logistics networks and limited visibility into available shipment opportunities.

This creates several challenges:

- Increased transportation costs
- Low fleet utilization
- Excess fuel consumption
- Higher carbon emissions
- Operational inefficiencies
- Limited logistics accessibility for SMEs

PACE transforms unused truck capacity into revenue-generating freight opportunities through intelligent route-aware matching.

---

## Solution

PACE continuously monitors available trucks, shipment requests, route information, and fleet status.

The AI-powered matching engine:

1. Detects available truck capacity
2. Analyzes shipment requirements
3. Evaluates route overlap and detour percentage
4. Identifies optimal truck-shipment pairs
5. Generates explainable recommendations
6. Tracks operational and sustainability impact

This reduces empty miles while improving profitability and environmental performance.

---

## Key Features

### AI-Powered Matching Engine
- Intelligent truck-to-shipment recommendations
- Route compatibility scoring
- Capacity optimization
- Driver and truck ranking

### Fleet Management
- Truck monitoring
- Driver management
- Shipment management
- Fleet utilization tracking

### Live Tracking
- GPS route visualization
- Location monitoring
- Delivery progress tracking
- OpenStreetMap integration

### Analytics Dashboard
- Fleet performance insights
- Revenue monitoring
- Empty-mile reduction metrics
- Operational KPIs

### Sustainability Intelligence
- CO₂ reduction tracking
- Fuel savings analysis
- Carbon efficiency monitoring
- Environmental impact reporting

### Administrative Control Center
- User management
- Operational oversight
- AI activity monitoring
- Workflow visualization

---

## Technology Stack

### Frontend
- Next.js 15
- TypeScript
- React
- Tailwind CSS
- Recharts
- Leaflet
- Axios

### Backend
- FastAPI
- Python
- SQLAlchemy ORM
- JWT Authentication

### Database
- PostgreSQL

### Database Migration
- Alembic

### DevOps & Deployment
- Docker
- Docker Compose

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │    Next.js Frontend │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   FastAPI Backend   │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Matching Engine │ │ Analytics Layer │ │ Tracking Engine │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         └───────────────────┼───────────────────┘
                             ▼
                  ┌─────────────────────┐
                  │    PostgreSQL DB    │
                  └─────────────────────┘
```

---

## Project Structure

```text
PACE
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── utils/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── core/
│   │
│   ├── alembic/
│   └── seed.py
│
├── data/
│
├── docker/
│
├── docs/
│
├── docker-compose.yml
└── README.md
```

---

## Project Modules

### Dashboard
Provides operational visibility including:
- Fleet utilization
- Empty miles saved
- AI recommendations
- Shipment queue

### Shipments
- Shipment creation
- Shipment monitoring
- Status tracking

### Trucks
- Fleet inventory
- Capacity management
- Vehicle availability

### Drivers
- Driver records
- Driver assignment
- Performance tracking

### Tracking
- Live GPS visualization
- Route monitoring
- Fleet location awareness

### Analytics
- Revenue insights
- Sustainability metrics
- Fleet performance analytics

### Admin
- Platform oversight
- AI workflow monitoring
- Administrative controls

---

## Local Development Setup

### Prerequisites

- Docker Desktop
- Python 3.11+
- Node.js 20+
- PostgreSQL (optional when using Docker)

---

## Backend Setup

```bash
pip install -r requirements.txt

alembic -c alembic.ini upgrade head

python backend/seed.py

uvicorn backend.app.main:app --reload --port 8000
```

Backend URL:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

## Docker Deployment

Start all services:

```bash
docker compose up --build
```

Stop services:

```bash
docker compose down
```

Restart services:

```bash
docker compose restart frontend

docker compose restart backend
```

---

## Demo Credentials

### User Account

```text
Email: user@pace.local
Password: password123
```

### Operations Account

```text
Email: ops@pace.local
Password: password123
```

---

## Seed Data

The platform includes realistic logistics seed datasets for demonstration and testing purposes.

### Available Records

| Entity | Count |
|----------|--------:|
| Companies | 20 |
| Users | 100 |
| Trucks | 100 |
| Drivers | 50 |
| Shipments | 1000 |
| GPS Logs | 5000 |
| Payments | Configurable |

Generated using:

```text
tools/generate_seed_data.py
```

---

## Core Business Impact

PACE delivers measurable operational and environmental benefits:

### Operational Benefits

- Improved fleet utilization
- Reduced empty truck miles
- Faster shipment allocation
- Increased carrier revenue
- Better asset utilization

### Environmental Benefits

- Reduced fuel consumption
- Lower CO₂ emissions
- Sustainable freight movement
- Improved transportation efficiency

---

## Scalability

PACE is designed to scale across:

- Multiple logistics companies
- Regional freight networks
- National transportation ecosystems
- Enterprise fleet operations

The architecture supports future integration with:

- Real-time GPS providers
- Fleet telematics platforms
- Freight marketplaces
- Transportation Management Systems (TMS)

---

## Future Scope

### AI Enhancements
- Predictive demand forecasting
- Dynamic route optimization
- Reinforcement learning-based dispatching
- Intelligent capacity prediction

### Platform Expansion
- Multi-company freight exchange
- Autonomous dispatch agents
- Carbon credit marketplace
- Dynamic pricing engine

### Real-Time Integrations
- GPS telemetry platforms
- IoT-enabled fleet monitoring
- External logistics APIs
- Third-party transportation systems

---

## Why PACE Matters

PACE demonstrates how Agentic AI can transform freight logistics by reducing empty miles, improving fleet efficiency, lowering operational costs, and contributing to sustainable transportation.

By combining AI-powered matching, route intelligence, and sustainability analytics, PACE creates economic value while reducing environmental impact.

---

## Team Vision

Building the future of intelligent, sustainable, and autonomous freight logistics through Agentic AI.
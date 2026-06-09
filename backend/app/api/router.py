from fastapi import APIRouter

from backend.app.api.routers.analytics import router as analytics_router
from backend.app.api.routers.auth import router as auth_router
from backend.app.api.routers.companies import router as companies_router
from backend.app.api.routers.drivers import router as drivers_router
from backend.app.api.routers.gps import router as gps_router
from backend.app.api.routers.payments import router as payments_router
from backend.app.api.routers.shipments import router as shipments_router
from backend.app.api.routers.trucks import router as trucks_router
from backend.app.api.routers.users import router as users_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(companies_router)
api_router.include_router(trucks_router)
api_router.include_router(drivers_router)
api_router.include_router(shipments_router)
api_router.include_router(gps_router)
api_router.include_router(payments_router)
api_router.include_router(analytics_router)

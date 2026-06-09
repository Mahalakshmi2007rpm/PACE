from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.router import api_router
from backend.app.core.config import get_settings
from backend.app.db.base import Base
from backend.app.db.session import engine
import backend.app.models  # noqa: F401

settings = get_settings()

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.project_name, version="1.0.0", debug=settings.debug)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": settings.project_name}

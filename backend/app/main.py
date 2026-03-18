from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router
from app.api.auth_api import router as auth_router
from app.api.admin_api import router as admin_router
from app.api.user_api import router as user_router

app = FastAPI(title="Chatbot AI Luật HNGĐ")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(user_router, prefix="/users", tags=["Users"])
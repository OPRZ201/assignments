from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from assignments_backend.endpoints import router
from assignments_backend.settings import settings

app = FastAPI(
    debug=False,
    title="Assignments Backend",
    description="This is a simple API to manage assignments",
    swagger_ui_parameters={
        "defaultModelRendering": "model",
        "displayRequestDuration": True,
        "docExpansion": "none",
    },
    servers=[
        {
            "url": "http://localhost:8000",
        }
    ],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(
    "/",
    include_in_schema=False,
)
async def redirect_to_docs() -> RedirectResponse:
    return RedirectResponse(url="/docs")


app.include_router(router.router)

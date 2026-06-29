from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from logging.config import dictConfig
from app.api.auth import router as auth_router
from app.api.survey import router as survey_router

dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }
    },
    'handlers': {
        'default': {
            'formatter': 'default',
            'class': 'logging.StreamHandler',
            'stream': 'ext://sys.stderr',
        }
    },
    'loggers': {
        'uvicorn': {'handlers': ['default'], 'level': 'INFO', 'propagate': False},
        'uvicorn.access': {'handlers': ['default'], 'level': 'INFO', 'propagate': False},
        'app': {'handlers': ['default'], 'level': 'INFO', 'propagate': False},
    },
})

@asynccontextmanager
async def lifespan(app: FastAPI):
    print('App startup')
    yield
    print('App shutdown')

app = FastAPI(
    title='Survey Studio API',
    description='API for creating, distributing, and analyzing surveys',
    version='0.1.0',
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', 'http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth_router)
app.include_router(survey_router)

@app.get('/health', tags=['Health'])
async def health_check():
    return {'status': 'ok'}

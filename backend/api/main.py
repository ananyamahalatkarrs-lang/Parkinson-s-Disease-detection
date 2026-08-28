from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import dashboard, dataset, features, classical, quantum, hybrid, comparison, circuit, experiments, performance

app = FastAPI(title="Q-PARKINSON Researcher API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(dataset.router, prefix="/api/dataset", tags=["Dataset"])
app.include_router(features.router, prefix="/api/features", tags=["Features"])
app.include_router(classical.router, prefix="/api/classical", tags=["Classical"])
app.include_router(quantum.router, prefix="/api/quantum", tags=["Quantum"])
app.include_router(hybrid.router, prefix="/api/hybrid", tags=["Hybrid"])
app.include_router(comparison.router, prefix="/api/comparison", tags=["Comparison"])
app.include_router(circuit.router, prefix="/api/circuit", tags=["Circuit"])
app.include_router(experiments.router, prefix="/api/experiments", tags=["Experiments"])
app.include_router(performance.router, prefix="/api/performance", tags=["Performance"])

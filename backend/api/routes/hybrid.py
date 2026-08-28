from fastapi import APIRouter
from api.schemas import ModelResult
from ml.hybrid.hybrid_models import run_hybrid_experiment
from ml.experiments.experiment_tracker import log_experiment

router = APIRouter()

@router.get("/", response_model=ModelResult)
def get_hybrid_results(model: str = "Classical-Quantum-Sequential"):
    res = run_hybrid_experiment(model)
    log_experiment("Hybrid", {"model": model}, res["metrics"])
    return res

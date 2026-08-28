from fastapi import APIRouter
from api.schemas import ModelResult
from ml.classical.classical_models import run_classical_experiment
from ml.experiments.experiment_tracker import log_experiment

router = APIRouter()

@router.get("/", response_model=ModelResult)
def get_classical_results(model: str = "RandomForest"):
    res = run_classical_experiment(model)
    log_experiment("Classical", {"model": model}, res["metrics"])
    return res

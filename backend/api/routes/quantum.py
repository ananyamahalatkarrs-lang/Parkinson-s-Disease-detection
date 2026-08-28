from fastapi import APIRouter
from api.schemas import ModelResult
from ml.quantum.quantum_models import run_quantum_experiment
from ml.experiments.experiment_tracker import log_experiment

router = APIRouter()

@router.get("/", response_model=ModelResult)
def get_quantum_results(model: str = "VQC"):
    res = run_quantum_experiment(model)
    log_experiment("Quantum", {"model": model}, res["metrics"])
    return res

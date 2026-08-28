from fastapi import APIRouter
from ml.experiments.experiment_tracker import get_all_experiments

router = APIRouter()

@router.get("/")
def get_experiments():
    return get_all_experiments()

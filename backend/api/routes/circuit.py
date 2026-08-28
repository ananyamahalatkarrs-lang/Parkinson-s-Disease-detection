from fastapi import APIRouter
from ml.quantum.circuits import get_circuit_visualization

router = APIRouter()

@router.get("/")
def get_circuit():
    return get_circuit_visualization()

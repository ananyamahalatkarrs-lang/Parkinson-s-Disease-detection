from fastapi import APIRouter
from ml.classical.classical_models import run_classical_experiment
from ml.quantum.quantum_models import run_quantum_experiment
from ml.hybrid.hybrid_models import run_hybrid_experiment

router = APIRouter()

@router.get("/")
def get_comparison():
    c_res = run_classical_experiment()["metrics"]
    q_res = run_quantum_experiment()["metrics"]
    h_res = run_hybrid_experiment()["metrics"]
    
    return [
        {"model": "Classical (RF)", **c_res},
        {"model": "Quantum (VQC)", **q_res},
        {"model": "Hybrid (Sequential)", **h_res}
    ]

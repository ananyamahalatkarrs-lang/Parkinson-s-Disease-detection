from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_performance():
    # Mock performance metrics
    return {
        "inference_latency_ms": {
            "Classical": 12,
            "Quantum": 150,
            "Hybrid": 85
        },
        "training_time_s": {
            "Classical": 2.5,
            "Quantum": 120.0,
            "Hybrid": 65.0
        }
    }

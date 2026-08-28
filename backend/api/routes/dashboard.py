from fastapi import APIRouter
from ml.experiments.experiment_tracker import get_all_experiments
from ml.data.loader import get_dataset_info

router = APIRouter()

@router.get("/")
def get_dashboard_summary():
    exps = get_all_experiments()
    ds_info = get_dataset_info()
    
    best_classic = max([e.get("metrics", {}).get("accuracy", 0) for e in exps if e["model_type"] == "Classical"] or [0])
    best_quant = max([e.get("metrics", {}).get("accuracy", 0) for e in exps if e["model_type"] == "Quantum"] or [0])
    best_hybrid = max([e.get("metrics", {}).get("accuracy", 0) for e in exps if e["model_type"] == "Hybrid"] or [0])
    
    return {
        "dataset_size": ds_info["rows"],
        "experiments_run": len(exps),
        "best_accuracy": {
            "classical": best_classic,
            "quantum": best_quant,
            "hybrid": best_hybrid
        },
        "last_run": exps[-1]["timestamp"] if exps else None,
        "recent_experiments": sorted(exps, key=lambda x: x["timestamp"], reverse=True)[:5]
    }

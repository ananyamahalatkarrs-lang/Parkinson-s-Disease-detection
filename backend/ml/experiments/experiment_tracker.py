import uuid
from datetime import datetime
import json
import os

EXPERIMENTS_FILE = "experiments.json"

def log_experiment(model_type, hyperparams, metrics, status="success"):
    exp = {
        "run_id": str(uuid.uuid4())[:8],
        "timestamp": datetime.now().isoformat(),
        "model_type": model_type,
        "hyperparameters": hyperparams,
        "metrics": metrics,
        "status": status
    }
    
    experiments = get_all_experiments()
    experiments.append(exp)
    
    with open(EXPERIMENTS_FILE, 'w') as f:
        json.dump(experiments, f)
        
    return exp

def get_all_experiments():
    if os.path.exists(EXPERIMENTS_FILE):
        with open(EXPERIMENTS_FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

# Initialize with some mock history
if not os.path.exists(EXPERIMENTS_FILE):
    log_experiment("Classical", {"model": "RandomForest", "n_estimators": 100}, {"accuracy": 0.85}, "success")
    log_experiment("Quantum", {"model": "VQC", "layers": 2}, {"accuracy": 0.78}, "success")
    log_experiment("Hybrid", {"model": "RF+VQC"}, {"accuracy": 0.89}, "success")
    log_experiment("Classical", {"model": "SVM", "kernel": "rbf"}, {"accuracy": 0.0}, "failed")

from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class Metrics(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1: float
    roc_auc: float
    confusion_matrix: List[List[int]]
    roc_curve: Dict[str, List[float]]

class ModelResult(BaseModel):
    model_used: str
    metrics: Metrics
    training_loss: Optional[List[float]] = None
    architecture_summary: Optional[str] = None

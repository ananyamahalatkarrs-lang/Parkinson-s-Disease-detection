from fastapi import APIRouter
from ml.data.loader import load_parkinsons_dataset

router = APIRouter()

@router.get("/")
def get_feature_analysis():
    df = load_parkinsons_dataset()
    corr = df.corr().to_dict()
    
    # Mock feature importance based on actual columns
    cols = list(df.columns)
    if 'Target' in cols:
        cols.remove('Target')
        
    importance = {
        "Classical (RF)": {col: 1.0/len(cols) for col in cols[:5]},
        "Quantum (VQC)": {col: 1.0/len(cols) for col in cols[:5]}
    }
    
    return {
        "correlation": corr,
        "importance": importance
    }

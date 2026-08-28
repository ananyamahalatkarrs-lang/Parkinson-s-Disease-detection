from fastapi import APIRouter
from ml.data.loader import get_dataset_info

router = APIRouter()

@router.get("/")
def get_dataset():
    return get_dataset_info()

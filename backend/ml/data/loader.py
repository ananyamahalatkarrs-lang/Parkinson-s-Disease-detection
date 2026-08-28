import pandas as pd
import numpy as np
import os

def load_parkinsons_dataset():
    # Construct path to the dataset
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, 'parkinsons.csv')
    
    # Load dataset
    df = pd.read_csv(csv_path)
    
    # Drop 'name' as it's an identifier
    if 'name' in df.columns:
        df = df.drop('name', axis=1)
        
    # Rename 'status' to 'Target' to match the rest of the application
    if 'status' in df.columns:
        df = df.rename(columns={'status': 'Target'})
        
    return df

def get_dataset_info():
    df = load_parkinsons_dataset()
    return {
        "name": "UCI ML Parkinsons dataset",
        "source": "UCI Machine Learning Repository",
        "rows": len(df),
        "cols": len(df.columns),
        "features": [{"name": col, "dtype": str(df[col].dtype)} for col in df.columns if col != 'Target'],
        "class_balance": {
            "0": int((df['Target'] == 0).sum()),
            "1": int((df['Target'] == 1).sum())
        },
        "missing_values": {col: int(df[col].isnull().sum()) for col in df.columns}
    }

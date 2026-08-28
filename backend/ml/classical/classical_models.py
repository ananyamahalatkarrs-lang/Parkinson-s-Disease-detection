from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from ..data.preprocessing import load_and_preprocess
from ..evaluation.metrics import calculate_metrics

def run_classical_experiment(model_type="RandomForest"):
    X_train, X_test, y_train, y_test = load_and_preprocess()
    
    if model_type == "RandomForest":
        clf = RandomForestClassifier(n_estimators=100, random_state=42)
    elif model_type == "SVM":
        clf = SVC(probability=True, random_state=42)
    else:
        raise ValueError(f"Unknown classical model: {model_type}")
        
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]
    
    metrics = calculate_metrics(y_test, y_pred, y_prob)
    return {
        "model_used": model_type,
        "metrics": metrics
    }

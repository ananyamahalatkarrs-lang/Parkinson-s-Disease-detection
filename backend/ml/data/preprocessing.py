from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from .loader import load_parkinsons_dataset

def load_and_preprocess():
    df = load_parkinsons_dataset()
    X = df.drop('Target', axis=1).values
    y = df['Target'].values
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    return X_train_scaled, X_test_scaled, y_train, y_test

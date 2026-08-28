// API Service Layer — connects to FastAPI backend or uses mock data

const BASE_URL = import.meta.env.VITE_API_URL || null;

export const DEMO_PATIENT = {
  name: 'Alex Morgan',
  age: 67,
  gender: 'Male',
  patientId: 'QH-2026-0042',
  assessments: 4,
  lastAssessment: '28 Aug 2026',
  features: {
    'MDVP:Fo(Hz)': 119.992,
    'MDVP:Fhi(Hz)': 157.302,
    'MDVP:Flo(Hz)': 74.997,
    'MDVP:Jitter(%)': 0.00784,
    'MDVP:Jitter(Abs)': 0.00007,
    'MDVP:RAP': 0.00370,
    'MDVP:PPQ': 0.00554,
    'Jitter:DDP': 0.01109,
    'MDVP:Shimmer': 0.04374,
    'MDVP:Shimmer(dB)': 0.426,
    'Shimmer:APQ3': 0.02182,
    'Shimmer:APQ5': 0.03130,
    'Shimmer:APQ11': 0.02971,
    'Shimmer:DDA': 0.06545,
    NHR: 0.02211,
    HNR: 21.033,
    RPDE: 0.414783,
    DFA: 0.815285,
    spread1: -4.813031,
    spread2: 0.266482,
    D2: 2.301442,
    PPE: 0.284654,
  },
};

export const MOCK_RESULTS = [
  {
    id: 'r1',
    date: '28 Aug 2026',
    riskLevel: 'Moderate',
    riskScore: 62,
    classical_svm: { result: 'Elevated Risk', confidence: 0.68 },
    random_forest: { result: 'Elevated Risk', confidence: 0.71 },
    quantum_ml: { result: 'Elevated Risk', confidence: 0.65 },
    hybrid: { result: 'Elevated Risk', confidence: 0.72 },
    featureImportance: [
      { feature: 'PPE', importance: 0.91 },
      { feature: 'spread1', importance: 0.78 },
      { feature: 'RPDE', importance: 0.72 },
      { feature: 'MDVP:Jitter(%)', importance: 0.61 },
      { feature: 'HNR', importance: 0.54 },
      { feature: 'DFA', importance: 0.47 },
    ],
  },
  {
    id: 'r2',
    date: '15 Aug 2026',
    riskLevel: 'Low',
    riskScore: 31,
    classical_svm: { result: 'Lower Risk', confidence: 0.82 },
    random_forest: { result: 'Lower Risk', confidence: 0.79 },
    quantum_ml: { result: 'Lower Risk', confidence: 0.77 },
    hybrid: { result: 'Lower Risk', confidence: 0.81 },
    featureImportance: [
      { feature: 'PPE', importance: 0.45 },
      { feature: 'spread1', importance: 0.38 },
      { feature: 'RPDE', importance: 0.32 },
      { feature: 'MDVP:Jitter(%)', importance: 0.28 },
      { feature: 'HNR', importance: 0.22 },
      { feature: 'DFA', importance: 0.19 },
    ],
  },
  {
    id: 'r3',
    date: '02 Aug 2026',
    riskLevel: 'Moderate',
    riskScore: 58,
    classical_svm: { result: 'Elevated Risk', confidence: 0.64 },
    random_forest: { result: 'Elevated Risk', confidence: 0.67 },
    quantum_ml: { result: 'Elevated Risk', confidence: 0.61 },
    hybrid: { result: 'Elevated Risk', confidence: 0.66 },
    featureImportance: [
      { feature: 'PPE', importance: 0.82 },
      { feature: 'spread1', importance: 0.71 },
      { feature: 'RPDE', importance: 0.65 },
      { feature: 'MDVP:Jitter(%)', importance: 0.55 },
      { feature: 'HNR', importance: 0.48 },
      { feature: 'DFA', importance: 0.41 },
    ],
  },
  {
    id: 'r4',
    date: '18 Jul 2026',
    riskLevel: 'Low',
    riskScore: 28,
    classical_svm: { result: 'Lower Risk', confidence: 0.85 },
    random_forest: { result: 'Lower Risk', confidence: 0.83 },
    quantum_ml: { result: 'Lower Risk', confidence: 0.80 },
    hybrid: { result: 'Lower Risk', confidence: 0.84 },
    featureImportance: [
      { feature: 'PPE', importance: 0.38 },
      { feature: 'spread1', importance: 0.31 },
      { feature: 'RPDE', importance: 0.27 },
      { feature: 'MDVP:Jitter(%)', importance: 0.22 },
      { feature: 'HNR', importance: 0.18 },
      { feature: 'DFA', importance: 0.15 },
    ],
  },
];

async function apiCall(endpoint, options = {}) {
  if (!BASE_URL) return null;
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch {
    return null;
  }
}

export const api = {
  getProfile: () => apiCall('/api/patient/profile'),
  getResults: () => apiCall('/api/patient/results'),
  getResult: (id) => apiCall(`/api/patient/results/${id}`),
  updateProfile: (data) => apiCall('/api/patient/profile', { method: 'PUT', body: JSON.stringify(data) }),
  submitAssessment: (data) => apiCall('/api/patient/assessment', { method: 'POST', body: JSON.stringify(data) }),
  predict: (data) => apiCall('/api/patient/predict', { method: 'POST', body: JSON.stringify(data) }),
};

export function simulateAnalysis(features) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const vals = Object.values(features);
      const jitter = features['MDVP:Jitter(%)'] || 0;
      const ppe = features['PPE'] || 0;
      const rpde = features['RPDE'] || 0;
      const score = Math.min(100, Math.round((jitter * 3000 + ppe * 60 + rpde * 30) + 20));
      const riskLevel = score >= 60 ? 'High' : score >= 40 ? 'Moderate' : 'Low';
      resolve({
        id: `r${Date.now()}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        riskLevel,
        riskScore: score,
        classical_svm: { result: score >= 50 ? 'Elevated Risk' : 'Lower Risk', confidence: 0.68 + Math.random() * 0.15 },
        random_forest: { result: score >= 50 ? 'Elevated Risk' : 'Lower Risk', confidence: 0.70 + Math.random() * 0.15 },
        quantum_ml: { result: score >= 50 ? 'Elevated Risk' : 'Lower Risk', confidence: 0.65 + Math.random() * 0.15 },
        hybrid: { result: score >= 50 ? 'Elevated Risk' : 'Lower Risk', confidence: 0.72 + Math.random() * 0.15 },
        featureImportance: [
          { feature: 'PPE', importance: Math.min(0.99, ppe * 2 + 0.3) },
          { feature: 'spread1', importance: Math.min(0.99, Math.abs(features['spread1'] || -4) / 6) },
          { feature: 'RPDE', importance: Math.min(0.99, rpde + 0.1) },
          { feature: 'MDVP:Jitter(%)', importance: Math.min(0.99, jitter * 80 + 0.2) },
          { feature: 'HNR', importance: Math.min(0.99, (30 - (features['HNR'] || 20)) / 30) },
          { feature: 'DFA', importance: Math.min(0.99, (features['DFA'] || 0.7) * 0.6) },
        ],
      });
    }, 4500);
  });
}

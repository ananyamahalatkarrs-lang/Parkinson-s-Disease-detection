const API_BASE = 'http://localhost:8000/api';

export const fetchDashboard = () => fetch(`${API_BASE}/dashboard`).then(res => res.json());
export const fetchDataset = () => fetch(`${API_BASE}/dataset`).then(res => res.json());
export const fetchFeatures = () => fetch(`${API_BASE}/features`).then(res => res.json());
export const fetchClassical = () => fetch(`${API_BASE}/classical`).then(res => res.json());
export const fetchQuantum = () => fetch(`${API_BASE}/quantum`).then(res => res.json());
export const fetchHybrid = () => fetch(`${API_BASE}/hybrid`).then(res => res.json());
export const fetchComparison = () => fetch(`${API_BASE}/comparison`).then(res => res.json());
export const fetchCircuit = () => fetch(`${API_BASE}/circuit`).then(res => res.json());
export const fetchExperiments = () => fetch(`${API_BASE}/experiments`).then(res => res.json());
export const fetchPerformance = () => fetch(`${API_BASE}/performance`).then(res => res.json());

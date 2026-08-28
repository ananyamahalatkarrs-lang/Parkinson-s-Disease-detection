import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/researcher/Dashboard';
import DatasetInfo from './pages/researcher/DatasetInfo';
import FeatureAnalysis from './pages/researcher/FeatureAnalysis';
import ClassicalResults from './pages/researcher/ClassicalResults';
import QuantumResults from './pages/researcher/QuantumResults';
import HybridResults from './pages/researcher/HybridResults';
import ModelComparison from './pages/researcher/ModelComparison';
import CircuitVisualization from './pages/researcher/CircuitVisualization';
import Experiments from './pages/researcher/Experiments';
import PerformanceMetrics from './pages/researcher/PerformanceMetrics';
import './theme/tokens.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dataset" element={<DatasetInfo />} />
            <Route path="/features" element={<FeatureAnalysis />} />
            <Route path="/classical" element={<ClassicalResults />} />
            <Route path="/quantum" element={<QuantumResults />} />
            <Route path="/hybrid" element={<HybridResults />} />
            <Route path="/comparison" element={<ModelComparison />} />
            <Route path="/circuit" element={<CircuitVisualization />} />
            <Route path="/experiments" element={<Experiments />} />
            <Route path="/performance" element={<PerformanceMetrics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

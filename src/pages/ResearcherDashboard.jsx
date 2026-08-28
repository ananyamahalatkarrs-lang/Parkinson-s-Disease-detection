import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Atom,
  Database,
  Cpu,
  TrendingUp,
  FlaskConical,
  BarChart2,
  Sliders,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Search,
  Activity,
  Layers
} from 'lucide-react';
import { BRAND_TEXT } from '../modules/Auth/utils/authConstants';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ResearcherDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [telemetryData, setTelemetryData] = useState({
    sampleCount: 195,
    quantumFidelity: '98.4%',
    hybridAccuracy: '94.2%',
    qpuLatency: '42ms'
  });
  const [modelBenchmarks, setModelBenchmarks] = useState(null);

  useEffect(() => {
    async function fetchResearchData() {
      try {
        const token = localStorage.getItem('q_parkinson_token');
        const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };

        const [datasetsRes, benchmarksRes] = await Promise.all([
          fetch(`${BASE_URL}/api/research/datasets`, { headers }).then(r => r.ok ? r.json() : null),
          fetch(`${BASE_URL}/api/research/models`, { headers }).then(r => r.ok ? r.json() : null)
        ]);

        if (datasetsRes && datasetsRes.success && datasetsRes.data && datasetsRes.data[0]) {
          setTelemetryData(prev => ({
            ...prev,
            sampleCount: datasetsRes.data[0].sampleCount || prev.sampleCount
          }));
        }

        if (benchmarksRes && benchmarksRes.success && benchmarksRes.data) {
          setModelBenchmarks(benchmarksRes.data);
        }
      } catch (err) {
        console.warn('Could not fetch telemetry data:', err);
      }
    }

    fetchResearchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Researcher Sidebar */}
      <aside style={{
        width: collapsed ? '74px' : '246px',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        userSelect: 'none'
      }}>
        <div>
          <div style={{
            padding: '1.25rem 1.25rem 1rem 1.25rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: '#F3F7FF',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
                flexShrink: 0
              }}>
                <Atom size={20} />
              </div>
              {!collapsed && (
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }} className="font-mono">
                    {BRAND_TEXT.NAME}
                  </div>
                  <div style={{ fontSize: '0.625rem', color: '#475569', fontWeight: 600, marginTop: '0.2rem' }}>
                    Quantum Research Lab
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.25rem' }}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav style={{ padding: '1rem 0.75rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              {!collapsed && (
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', padding: '0 0.75rem 0.5rem 0.75rem' }} className="font-mono">
                  RESEARCH LAB
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {[
                  { id: 'overview', label: 'Lab Overview', icon: FlaskConical },
                  { id: 'datasets', label: 'Dataset Telemetry', icon: Database },
                  { id: 'qml', label: 'QML Simulation', icon: Cpu },
                  { id: 'benchmarks', label: 'Model Benchmarks', icon: BarChart2 }
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '10px',
                        color: isActive ? '#2563EB' : '#475569',
                        backgroundColor: isActive ? '#EAF2FF' : 'transparent',
                        fontWeight: isActive ? 700 : 500,
                        border: 'none',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      <Icon size={18} />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Footer Profile */}
        <div style={{ padding: '0.85rem 0.75rem', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem', marginBottom: '0.25rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#7C3AED', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              {currentUser?.name?.charAt(0) || 'R'}
            </div>
            {!collapsed && (
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser?.name || 'Dr. Evelyn Reed'}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#475569' }}>
                  Researcher
                </div>
              </div>
            )}
          </div>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.45rem 0.5rem', borderRadius: '8px', color: '#EF4444', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: '64px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.75rem', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ position: 'relative', width: '340px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input type="text" placeholder="Search datasets, hyperparameters, quantum circuits..." className="input-field" style={{ paddingLeft: '2.4rem', fontSize: '0.825rem', height: '36px', backgroundColor: '#F8FAFC' }} />
          </div>
          <div className="badge badge-cyan font-mono" style={{ padding: '0.35rem 0.75rem' }}>
            <Atom size={13} color="#06B6D4" /> 4-QUBIT ZZFEATUREMAP QSVC ACTIVE
          </div>
        </header>

        <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto' }}>
          {/* Header Bar */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-blue)', letterSpacing: '0.08em', marginBottom: '0.25rem' }} className="font-mono">
              QUANTUM MACHINE LEARNING LAB TELEMETRY
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Research Telemetry & Experimentation
            </h1>
          </div>

          {/* Metric Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
            <div className="card-base" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">DATASET SAMPLES</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>{telemetryData.sampleCount}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Oxford Voice Telemetry</div>
            </div>
            <div className="card-base" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">QUANTUM FIDELITY</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--success)', margin: '0.25rem 0' }}>{telemetryData.quantumFidelity}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>StateVector Simulation</div>
            </div>
            <div className="card-base" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">HYBRID ACCURACY</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-blue)', margin: '0.25rem 0' }}>{telemetryData.hybridAccuracy}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>QSVC + Classical SVM</div>
            </div>
            <div className="card-base" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">QPU SIMULATION LATENCY</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--violet)', margin: '0.25rem 0' }}>{telemetryData.qpuLatency}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>4-Qubit Circuit</div>
            </div>
          </div>

          {/* Model Comparison Table */}
          <div className="card-base" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Model Architecture Benchmarks
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">MODEL ARCHITECTURE</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">ACCURACY</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">PRECISION</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">RECALL</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">F1-SCORE</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {modelBenchmarks?.classical_svm?.name || 'Classical SVM (RBF Kernel)'}
                  </td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.classical_svm?.accuracy || '88.4%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.classical_svm?.precision || '87.0%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.classical_svm?.recall || '89.0%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.classical_svm?.f1Score || '0.880'}</td>
                  <td style={{ padding: '0.75rem' }}><span className="badge badge-info font-mono">{modelBenchmarks?.classical_svm?.status || 'ACTIVE'}</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {modelBenchmarks?.random_forest?.name || 'Random Forest (100 Trees)'}
                  </td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.random_forest?.accuracy || '90.2%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.random_forest?.precision || '89.5%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.random_forest?.recall || '91.0%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.random_forest?.f1Score || '0.898'}</td>
                  <td style={{ padding: '0.75rem' }}><span className="badge badge-info font-mono">{modelBenchmarks?.random_forest?.status || 'ACTIVE'}</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {modelBenchmarks?.quantum_qsvc?.name || 'Quantum QSVC (ZZFeatureMap)'}
                  </td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.quantum_qsvc?.accuracy || '93.8%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.quantum_qsvc?.precision || '92.8%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.quantum_qsvc?.recall || '94.5%'}</td>
                  <td style={{ padding: '0.75rem' }}>{modelBenchmarks?.quantum_qsvc?.f1Score || '0.932'}</td>
                  <td style={{ padding: '0.75rem' }}><span className="badge badge-cyan font-mono">{modelBenchmarks?.quantum_qsvc?.status || 'QML ACTIVE'}</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                    {modelBenchmarks?.hybrid_qsvc_svm?.name || 'Hybrid QSVC + Classical SVM'}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)' }}>{modelBenchmarks?.hybrid_qsvc_svm?.accuracy || '94.2%'}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{modelBenchmarks?.hybrid_qsvc_svm?.precision || '93.1%'}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{modelBenchmarks?.hybrid_qsvc_svm?.recall || '95.0%'}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{modelBenchmarks?.hybrid_qsvc_svm?.f1Score || '0.940'}</td>
                  <td style={{ padding: '0.75rem' }}><span className="badge badge-violet font-mono">{modelBenchmarks?.hybrid_qsvc_svm?.status || 'HYBRID BEST'}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

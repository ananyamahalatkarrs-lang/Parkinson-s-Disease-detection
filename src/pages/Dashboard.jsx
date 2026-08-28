import React from 'react';
import { useApp } from '../context/AppContext';
import { Atom, Activity, Brain, ArrowRight, ShieldCheck } from 'lucide-react';

function StatCard({ label, value, sub, color }) {
  return (
    <div className="card-base" style={{
      padding: '1.25rem',
      display: 'flex', flexDirection: 'column', gap: '0.4rem',
      transition: 'all 0.15s ease-in-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">{label}</span>
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: color || 'var(--primary-blue)' }}>{value}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const { patient, results, setActivePage } = useApp();
  const latest = results[0];
  const riskColor = latest?.riskLevel === 'Elevated' || latest?.riskLevel === 'High' ? 'var(--danger)' : latest?.riskLevel === 'Moderate' ? 'var(--warning)' : 'var(--success)';

  return (
    <div className="animate-fadeIn">
      {/* Header Heading Bar */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-blue)', letterSpacing: '0.08em', marginBottom: '0.25rem' }} className="font-mono">
          PERSONAL HEALTH RISK TELEMETRY
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Welcome back, {patient?.name || 'Alex Morgan'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '4px 0 0' }}>
              Hybrid Quantum Machine Learning Platform for Early Disease Detection & Risk Telemetry
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setActivePage('assessment')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
          >
            <Brain size={16} /> Start New Assessment <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Hero Telemetry Card */}
      <div className="card-base" style={{
        position: 'relative', overflow: 'hidden',
        padding: '2rem 2.25rem', marginBottom: '1.75rem',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.06) 0%, rgba(6, 182, 212, 0.04) 100%)',
        border: '1px solid rgba(37, 99, 235, 0.2)'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div className="badge badge-info font-mono" style={{ marginBottom: '0.85rem' }}>
            <Atom size={13} color="var(--primary-blue)" /> HYBRID QML INFERENCE ENGINE ACTIVE
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
            Longitudinal Risk Assessment & Explainability
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
            Q-PARKINSON analyzes multi-modal acoustic voice perturbation and motor kinematics using classical SVM and 4-Qubit QSVC quantum simulation to generate longitudinal risk telemetry.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => setActivePage('assessment')}
            >
              Run Risk Telemetry
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setActivePage('results')}
            >
              View Historical Results
            </button>
          </div>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <StatCard label="LATEST RISK CATEGORY" value={latest?.riskLevel || 'Moderate'} sub={`Risk Score: ${latest?.riskScore ?? 62}%`} color={riskColor} />
        <StatCard label="LAST ASSESSMENT" value={latest?.date || '28 Aug 2026'} sub="Most recent telemetry session" color="var(--primary-blue)" />
        <StatCard label="TOTAL SESSIONS" value={results.length || 4} sub="Completed longitudinal runs" color="var(--violet)" />
        <StatCard label="TELEMETRY STATUS" value="Active" sub="Ready for new assessment" color="var(--success)" />
      </div>

      {/* How It Works Section */}
      <div className="card-base" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '1rem' }} className="font-mono">
          HOW Q-PARKINSON RISK TELEMETRY WORKS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {[
            { step: '01', title: 'Data Submission', desc: 'Biomedical voice telemetry feature vectors are submitted via CSV or demo profile.' },
            { step: '02', title: 'Signal Preprocessing', desc: 'Acoustic parameters (PPE, Jitter, Shimmer) are normalized and feature-scaled.' },
            { step: '03', title: 'Hybrid QML Engine', desc: '4-Qubit ZZFeatureMap state vector quantum classifier evaluates non-linear separability.' },
            { step: '04', title: 'Risk Telemetry', desc: 'Explainable feature importance and risk category decision support are generated.' }
          ].map((item) => (
            <div key={item.step} style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.35rem' }} className="font-mono">
                STEP {item.step}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Medical Disclaimer */}
      <div style={{
        padding: '1rem 1.25rem',
        backgroundColor: '#F8FAFC',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.775rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6
      }}>
        <strong style={{ color: 'var(--text-primary)' }}>Medical Research Disclaimer:</strong> Q-PARKINSON is an AI and quantum machine learning research platform for early risk assessment and longitudinal monitoring. It is not a diagnostic device and does not constitute a confirmed medical diagnosis.
      </div>
    </div>
  );
}

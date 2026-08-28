'use client';
import { useApp } from '../context/AppContext';

function StatCard({ label, value, sub, color, emoji }) {
  return (
    <div className="glass-card" style={{
      padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 8,
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(29,78,216,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 11, color: '#4b6a8a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
        <span style={{ fontSize: 20 }}>{emoji}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: color || '#1d4ed8' }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#64748b' }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const { patient, results, setActivePage } = useApp();
  const latest = results[0];
  const riskColor = latest?.riskLevel === 'High' ? '#dc2626' : latest?.riskLevel === 'Moderate' ? '#d97706' : '#16a34a';

  return (
    <div style={{ padding: '32px', maxWidth: 1080, margin: '0 auto' }} className="animate-fadeIn">

      {/* Top header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: '#000000' }}>Q-Health</h1>
          <p style={{ color: '#4b6a8a', fontSize: 13, margin: '4px 0 0', fontWeight: 600 }}>Hybrid Quantum AI for Early Parkinson's Risk Detection</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', background: 'rgba(29,78,216,0.06)', border: '1px solid rgba(29,78,216,0.15)', borderRadius: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#1d4ed8,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>
            {patient.name?.[0] || 'P'}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e3a5f' }}>{patient.name}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Patient</div>
          </div>
        </div>
      </div>

      {/* Hero card */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '36px 32px', marginBottom: 28, borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(29,78,216,0.07) 0%, rgba(14,165,233,0.05) 50%, rgba(59,130,246,0.04) 100%)',
        border: '1px solid rgba(29,78,216,0.15)',
      }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(29,78,216,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -10, top: -10, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(29,78,216,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 20, top: 20, width: 100, height: 100, borderRadius: '50%', border: '1px solid rgba(29,78,216,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 45, top: 45, width: 50, height: 50, borderRadius: '50%', background: 'rgba(29,78,216,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, pointerEvents: 'none' }}>⚛</div>

        <div style={{ maxWidth: 560, position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(29,78,216,0.08)', border: '1px solid rgba(29,78,216,0.2)', borderRadius: 20, marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: '#1d4ed8', fontWeight: 700 }}>AI System Online</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#000000', margin: '0 0 12px', lineHeight: 1.3 }}>
            Understand Your Health Risk<br />with Hybrid AI
          </h2>
          <p style={{ color: '#4b6a8a', fontSize: 14, lineHeight: 1.7, margin: '0 0 24px' }}>
            Q-Health analyzes biomedical voice-related features using classical and quantum machine learning to provide a preliminary Parkinson's risk assessment.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              style={{ fontSize: 15, padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => setActivePage('assessment')}
            >
              Start New Assessment
              <span style={{ fontSize: 16 }}>→</span>
            </button>
            <button
              className="btn-secondary"
              style={{ fontSize: 14, padding: '12px 24px' }}
              onClick={() => setActivePage('results')}
            >
              View Results
            </button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Latest Risk" value={latest?.riskLevel || '—'} sub={`Score: ${latest?.riskScore ?? '—'}%`} color={riskColor} emoji="🎯" />
        <StatCard label="Last Assessment" value={latest?.date || '—'} sub="Most recent session" color="#1d4ed8" emoji="📅" />
        <StatCard label="Assessments" value={results.length} sub="Total completed" color="#7c3aed" emoji="✅" />
        <StatCard label="Status" value="Available" sub="Ready for new assessment" color="#16a34a" emoji="🟢" />
      </div>

      {/* How Q-Health works */}
      <div className="glass-card" style={{ padding: '24px 28px', marginBottom: 28 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>How Q-Health Works</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16 }}>
          {[
            { n: '1', title: 'Provide Data', desc: 'Biomedical voice-related data is submitted via CSV upload or demo patient.', emoji: '🎙' },
            { n: '2', title: 'Preprocess', desc: 'The data is validated, scaled and prepared for the AI pipeline.', emoji: '⚙' },
            { n: '3', title: 'Hybrid AI', desc: 'Classical ML and Quantum ML (QSVC) process the feature representation.', emoji: '⚛' },
            { n: '4', title: 'Risk Assessment', desc: 'An explainable preliminary risk assessment is generated.', emoji: '📊' },
          ].map(({ n, title, desc, emoji }) => (
            <div key={n} style={{ padding: '16px', background: 'rgba(29,78,216,0.04)', borderRadius: 12, border: '1px solid rgba(29,78,216,0.09)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(29,78,216,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#1d4ed8' }}>{n}</div>
                <span style={{ fontSize: 16 }}>{emoji}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#000000', marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 12, color: '#4b6a8a', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent assessments */}
      {results.length > 0 && (
        <div className="glass-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Recent Assessments</h3>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '6px 14px' }} onClick={() => setActivePage('results')}>View All →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {results.slice(0, 3).map((r) => {
              const c = r.riskLevel === 'High' ? '#dc2626' : r.riskLevel === 'Moderate' ? '#d97706' : '#16a34a';
              return (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(29,78,216,0.03)', borderRadius: 10, border: '1px solid rgba(29,78,216,0.07)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(29,78,216,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(29,78,216,0.03)'}
                >
                  <span style={{ color: '#4b6a8a', fontSize: 13, minWidth: 100 }}>{r.date}</span>
                  <span style={{ color: c, fontWeight: 700, fontSize: 13, background: `${c}18`, padding: '3px 10px', borderRadius: 6 }}>{r.riskLevel}</span>
                  <span style={{ color: '#64748b', fontSize: 13 }}>{r.riskScore}%</span>
                  <button className="btn-secondary" style={{ fontSize: 11, padding: '5px 12px' }} onClick={() => { setActivePage('results'); }}>View →</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer disclaimer */}
      <div style={{ marginTop: 28, padding: '12px 16px', background: 'rgba(29,78,216,0.03)', border: '1px solid rgba(29,78,216,0.08)', borderRadius: 10, fontSize: 11, color: '#4b6a8a', lineHeight: 1.7 }}>
        <strong style={{ color: '#1e3a5f' }}>Medical Disclaimer:</strong> Q-Health is an AI-based research prototype intended for preliminary risk assessment and educational/research purposes. It is not a medical diagnostic device and should not replace evaluation by a qualified healthcare professional.
      </div>
    </div>
  );
}

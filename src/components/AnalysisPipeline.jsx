import { useEffect, useState } from 'react';

const STEPS = [
  { label: 'Data Received', icon: '📥', delay: 0 },
  { label: 'Data Validation', icon: '✓', delay: 500 },
  { label: 'Feature Scaling', icon: '⚖', delay: 1000 },
  { label: 'PCA / Feature Reduction', icon: '🔬', delay: 1600 },
  { label: 'Classical ML (SVM + RF)', icon: '🤖', delay: 2200 },
  { label: 'Quantum ML (QSVC)', icon: '⚛', delay: 3000 },
  { label: 'Hybrid Analysis', icon: '🔗', delay: 3600 },
  { label: 'Risk Assessment', icon: '📊', delay: 4200 },
];

export default function AnalysisPipeline() {
  const [completed, setCompleted] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    STEPS.forEach((s, i) => {
      setTimeout(() => {
        setActive(i);
        if (i > 0) setCompleted(c => [...c, i - 1]);
      }, s.delay);
    });
  }, []);

  return (
    <div style={{ padding: '40px 32px', maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="animate-fadeIn">
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        {/* Quantum animation */}
        <div style={{ width: 80, height: 80, margin: '0 auto 20px', position: 'relative' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(56,189,248,0.3)', position: 'absolute', animation: 'spin-slow 4s linear infinite' }} />
          <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid rgba(34,211,238,0.4)', position: 'absolute', top: 10, left: 10, animation: 'spin-slow 3s linear infinite reverse' }} />
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(14,165,233,0.3),rgba(6,182,212,0.3))', position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚛</div>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e2e8f0', margin: 0 }}>Analyzing Your Health Data</h2>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>Q-Health is processing your information through its hybrid AI pipeline.</p>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {STEPS.map((s, i) => {
          const isDone = completed.includes(i);
          const isActive = active === i && !isDone;
          return (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 10, background: isDone ? 'rgba(74,222,128,0.06)' : isActive ? 'rgba(56,189,248,0.08)' : 'rgba(56,189,248,0.02)', border: `1px solid ${isDone ? 'rgba(74,222,128,0.2)' : isActive ? 'rgba(56,189,248,0.25)' : 'rgba(56,189,248,0.06)'}`, transition: 'all 0.4s' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: isDone ? 'rgba(74,222,128,0.15)' : isActive ? 'rgba(56,189,248,0.15)' : 'rgba(56,189,248,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                {isDone ? '✓' : isActive ? <span className="animate-pulse-slow">{s.icon}</span> : s.icon}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: isDone ? '#4ade80' : isActive ? '#38bdf8' : '#475569', flex: 1 }}>{s.label}</span>
              <span style={{ fontSize: 12, color: isDone ? '#4ade80' : isActive ? '#38bdf8' : '#334155' }}>
                {isDone ? 'Complete' : isActive ? 'Processing...' : 'Pending'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quantum visualization */}
      <div className="glass-card" style={{ marginTop: 24, padding: 20, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quantum AI Pipeline</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          {['Classical Feature Space', '→', 'Quantum Feature Map', '→', 'Quantum Kernel', '→', 'QSVC'].map((t, i) => (
            <span key={i} style={{ fontSize: 12, color: t === '→' ? '#334155' : '#38bdf8', background: t === '→' ? 'none' : 'rgba(56,189,248,0.08)', padding: t === '→' ? '0' : '4px 10px', borderRadius: 6, border: t === '→' ? 'none' : '1px solid rgba(56,189,248,0.15)' }}>{t}</span>
          ))}
        </div>
        <p style={{ color: '#475569', fontSize: 11, marginTop: 10 }}>Quantum simulation via Qiskit FidelityQuantumKernel + QSVC</p>
      </div>
    </div>
  );
}

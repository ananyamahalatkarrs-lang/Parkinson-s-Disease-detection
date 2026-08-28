import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

function RedirectToResults({ setActivePage }) {
  useEffect(() => { setActivePage('results'); }, [setActivePage]);
  return null;
}

function CircularRisk({ score, level }) {
  const color = level === 'High' ? '#f87171' : level === 'Moderate' ? '#fbbf24' : '#4ade80';
  const r = 54, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto' }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="10" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1.5s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 26, fontWeight: 900, color }}>{score}%</div>
        <div style={{ fontSize: 11, color: '#64748b' }}>Risk Score</div>
      </div>
    </div>
  );
}

function ModelRow({ label, result, confidence, highlight }) {
  const isElevated = result?.toLowerCase().includes('elevated');
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 10, background: highlight ? 'rgba(56,189,248,0.08)' : 'rgba(56,189,248,0.03)', border: `1px solid ${highlight ? 'rgba(56,189,248,0.3)' : 'rgba(56,189,248,0.08)'}`, marginBottom: 8 }}>
      <span style={{ fontSize: 14, fontWeight: highlight ? 700 : 500, color: highlight ? '#38bdf8' : '#94a3b8' }}>{label}{highlight && ' ★'}</span>
      <span style={{ fontSize: 13, color: isElevated ? '#fbbf24' : '#4ade80', fontWeight: 600 }}>{result || '—'}</span>
      <span style={{ fontSize: 12, color: '#64748b' }}>{confidence ? `${(confidence * 100).toFixed(0)}% conf.` : '—'}</span>
    </div>
  );
}

function FeatureBar({ feature, importance }) {
  const pct = Math.round(importance * 100);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{feature}</span>
        <span style={{ fontSize: 12, color: '#64748b' }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: 'rgba(56,189,248,0.1)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#0ea5e9,#22d3ee)', borderRadius: 4, transition: 'width 1s ease' }} />
      </div>
    </div>
  );
}

export default function ResultPage() {
  const { currentResult, setActivePage } = useApp();
  const r = currentResult;
  if (!r) return <RedirectToResults setActivePage={setActivePage} />;

  const riskColor = r.riskLevel === 'High' ? '#f87171' : r.riskLevel === 'Moderate' ? '#fbbf24' : '#4ade80';
  const riskBg = r.riskLevel === 'High' ? 'rgba(248,113,113,0.08)' : r.riskLevel === 'Moderate' ? 'rgba(251,191,36,0.08)' : 'rgba(74,222,128,0.08)';
  const riskBorder = r.riskLevel === 'High' ? 'rgba(248,113,113,0.3)' : r.riskLevel === 'Moderate' ? 'rgba(251,191,36,0.3)' : 'rgba(74,222,128,0.3)';

  const isElevated = r.riskLevel !== 'Low';

  return (
    <div style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }} className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#000000', margin: 0 }}>Your Parkinson's Risk Assessment</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>Assessment date: {r.date}</p>
        </div>
        <button className="btn-secondary" style={{ fontSize: 13 }} onClick={() => setActivePage('results')}>← View All Results</button>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '12px 16px', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10, marginBottom: 24, fontSize: 13, color: '#94a3b8' }}>
        ⚠ This AI-generated result is a preliminary risk assessment and is not a medical diagnosis.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Risk card */}
        <div className="glass-card" style={{ padding: 28, background: riskBg, border: `1px solid ${riskBorder}`, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Model-Estimated Risk Level</div>
          <CircularRisk score={r.riskScore} level={r.riskLevel} />
          <div style={{ fontSize: 22, fontWeight: 900, color: riskColor, marginTop: 16 }}>{r.riskLevel} Risk</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>Your model-estimated Parkinson's risk is {r.riskLevel === 'Low' ? 'lower' : 'elevated'}.</div>
        </div>

        {/* Model comparison */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Model Comparison</div>
          <ModelRow label="Classical SVM" result={r.classical_svm?.result} confidence={r.classical_svm?.confidence} />
          <ModelRow label="Random Forest" result={r.random_forest?.result} confidence={r.random_forest?.confidence} />
          <ModelRow label="Quantum ML (QSVC)" result={r.quantum_ml?.result} confidence={r.quantum_ml?.confidence} />
          <ModelRow label="Hybrid Model" result={r.hybrid?.result} confidence={r.hybrid?.confidence} highlight />
        </div>
      </div>

      {/* Explainable AI */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#000000', marginBottom: 6 }}>Why did the model produce this result?</h2>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>These features had a higher influence on the model's prediction for this assessment.</p>
        {r.featureImportance?.map(f => <FeatureBar key={f.feature} feature={f.feature} importance={f.importance} />)}
        <p style={{ color: '#475569', fontSize: 12, marginTop: 12, fontStyle: 'italic' }}>Note: These features influenced the model's prediction. They do not indicate causation of Parkinson's disease.</p>
      </div>

      {/* Risk interpretation */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 20, background: riskBg, border: `1px solid ${riskBorder}` }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: riskColor, marginBottom: 10 }}>Risk Interpretation</h3>
        <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          {isElevated
            ? 'The model estimates an elevated risk based on the submitted data. This does not confirm Parkinson\'s disease. Consider discussing persistent symptoms or concerns with a qualified healthcare professional.'
            : 'The model estimates a lower risk based on the submitted data. A low model-estimated risk does not rule out Parkinson\'s disease. Consult a healthcare professional if you have symptoms or concerns.'}
        </p>
      </div>

      {/* Health guidance */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#000000', marginBottom: 14 }}>General Health Guidance</h3>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Maintain regular physical activity appropriate for your health condition.',
            'Maintain a healthy sleep routine.',
            'Pay attention to persistent changes in movement, speech or coordination.',
            'Keep track of symptoms and changes over time.',
            'Seek professional medical evaluation when symptoms persist or cause concern.',
          ].map((g, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
              <span style={{ color: '#38bdf8', flexShrink: 0 }}>→</span>{g}
            </li>
          ))}
        </ul>
      </div>

      {/* Quantum visualization */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Quantum AI Processing Summary</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {['Classical Feature Space', '→', 'Quantum Feature Map', '→', 'Quantum Kernel (Fidelity)', '→', 'QSVC Classification'].map((t, i) => (
            <span key={i} style={{ fontSize: 12, color: t === '→' ? '#334155' : '#38bdf8', background: t === '→' ? 'none' : 'rgba(56,189,248,0.08)', padding: t === '→' ? '0' : '5px 12px', borderRadius: 6, border: t === '→' ? 'none' : '1px solid rgba(56,189,248,0.15)' }}>{t}</span>
          ))}
        </div>
        <p style={{ color: '#475569', fontSize: 11, marginTop: 10 }}>Quantum simulation via Qiskit FidelityQuantumKernel + QSVC. Prototype uses quantum simulator.</p>
      </div>

      {/* Footer disclaimer */}
      <div style={{ padding: '14px 16px', background: 'rgba(56,189,248,0.03)', border: '1px solid rgba(56,189,248,0.1)', borderRadius: 10, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>
        <strong style={{ color: '#64748b' }}>Medical Disclaimer:</strong> Q-Health is an AI-based research prototype intended for preliminary risk assessment and educational/research purposes. It is not a medical diagnostic device and should not be used as a substitute for evaluation by a qualified healthcare professional.
      </div>
    </div>
  );
}

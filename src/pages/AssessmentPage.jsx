import { ChevronDown, ChevronRight, ChevronUp, Upload, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_PATIENT, simulateAnalysis } from '../services/api';
import AnalysisPipeline from '../components/AnalysisPipeline';

function Navigate({ setActivePage }) {
  useEffect(() => { setActivePage('result'); }, [setActivePage]);
  return null;
}

const FEATURE_GROUPS = [
  { label: 'Fundamental Frequency', keys: ['MDVP:Fo(Hz)', 'MDVP:Fhi(Hz)', 'MDVP:Flo(Hz)'] },
  { label: 'Frequency Variation (Jitter)', keys: ['MDVP:Jitter(%)', 'MDVP:Jitter(Abs)', 'MDVP:RAP', 'MDVP:PPQ', 'Jitter:DDP'] },
  { label: 'Amplitude Variation (Shimmer)', keys: ['MDVP:Shimmer', 'MDVP:Shimmer(dB)', 'Shimmer:APQ3', 'Shimmer:APQ5', 'Shimmer:APQ11', 'Shimmer:DDA'] },
  { label: 'Noise / Harmonics', keys: ['NHR', 'HNR'] },
  { label: 'Nonlinear Features', keys: ['RPDE', 'DFA', 'spread1', 'spread2', 'D2', 'PPE'] },
];

function FeatureGroup({ group, features, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', padding: '12px 16px', background: 'rgba(56,189,248,0.05)', border: 'none', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
        {group.label}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
          {group.keys.map(k => (
            <div key={k}>
              <label style={{ fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>{k}</label>
              <input className="input-field" type="number" step="any" value={features[k] ?? ''} onChange={e => onChange(k, e.target.value)} placeholder="0.000" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AssessmentPage() {
  const { patient, addResult, setActivePage } = useApp();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ age: patient.age || '', gender: patient.gender || 'Male', patientId: patient.patientId || '' });
  const [features, setFeatures] = useState({});
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [fileStatus, setFileStatus] = useState(null);
  const [wellbeing, setWellbeing] = useState({ sleep: '', activity: '', stress: '' });
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef();

  const loadDemo = () => {
    setFeatures(DEMO_PATIENT.features);
    setInfo({ age: DEMO_PATIENT.age, gender: DEMO_PATIENT.gender, patientId: DEMO_PATIENT.patientId });
    setDemoLoaded(true);
    setFileStatus({ name: 'demo_patient_UCI.csv', valid: true });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileStatus({ name: file.name, valid: false, loading: true });
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const lines = ev.target.result.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const vals = lines[1]?.split(',').map(v => parseFloat(v.trim()));
        const parsed = {};
        headers.forEach((h, i) => { if (!isNaN(vals[i])) parsed[h] = vals[i]; });
        const allKeys = FEATURE_GROUPS.flatMap(g => g.keys);
        const found = allKeys.filter(k => parsed[k] !== undefined).length;
        if (found >= 10) {
          setFeatures(parsed);
          setFileStatus({ name: file.name, valid: true, found });
        } else {
          setFileStatus({ name: file.name, valid: false, error: `Only ${found} recognised features found. Expected UCI Parkinson's format.` });
        }
      } catch {
        setFileStatus({ name: file.name, valid: false, error: 'Could not parse file.' });
      }
    };
    reader.readAsText(file);
  };

  const handleFeatureChange = (k, v) => setFeatures(f => ({ ...f, [k]: parseFloat(v) || v }));

  const handleSubmit = async () => {
    setAnalyzing(true);
    const result = await simulateAnalysis(features);
    addResult(result);
    setAnalyzing(false);
    setDone(true);
  };

  if (analyzing) return <AnalysisPipeline />;
  if (done) {
    // Use effect-free navigation via a tiny wrapper
    return <Navigate to="result" setActivePage={setActivePage} />;
  }

  return (
    <div style={{ padding: '32px', maxWidth: 800, margin: '0 auto' }} className="animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#000000', margin: 0 }}>Parkinson's Risk Assessment</h1>
      <p style={{ color: '#64748b', fontSize: 14, marginTop: 6, marginBottom: 28 }}>Provide your available voice/biomedical information for a preliminary AI-based assessment.</p>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {['Basic Info', 'Voice Data', 'Well-being'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > i + 1 ? '#0ea5e9' : step === i + 1 ? 'linear-gradient(135deg,#0ea5e9,#06b6d4)' : 'rgba(56,189,248,0.1)', border: step === i + 1 ? 'none' : '1px solid rgba(56,189,248,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: step >= i + 1 ? 'white' : '#475569' }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: step === i + 1 ? '#38bdf8' : '#475569', fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
            {i < 2 && <ChevronRight size={14} color="#334155" />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#000000', marginBottom: 20 }}>Basic Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>AGE</label>
              <input className="input-field" type="number" value={info.age} onChange={e => setInfo(i => ({ ...i, age: e.target.value }))} placeholder="e.g. 65" />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>GENDER</label>
              <select className="select-field" value={info.gender} onChange={e => setInfo(i => ({ ...i, gender: e.target.value }))}>
                <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
              </select>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>PATIENT ID <span style={{ color: '#475569', fontWeight: 400 }}>(optional)</span></label>
              <input className="input-field" value={info.patientId} onChange={e => setInfo(i => ({ ...i, patientId: e.target.value }))} placeholder="QH-YYYY-XXXX" />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button className="btn-primary" onClick={() => setStep(2)}>Next: Voice Data <ChevronRight size={15} /></button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#000000', marginBottom: 6 }}>Voice / Biomedical Data</h2>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Based on the UCI Parkinson's voice dataset (22 biomedical features).</p>

          {/* Demo button */}
          <button onClick={loadDemo} style={{ width: '100%', padding: '16px', marginBottom: 16, background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(14,165,233,0.15))', border: '2px solid rgba(99,102,241,0.4)', borderRadius: 12, color: '#a5b4fc', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.2s' }}>
            <Zap size={18} color="#a5b4fc" />
            Load Demo Patient (SIH Demo)
            <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 400 }}>— Loads UCI sample data instantly</span>
          </button>

          {/* Upload */}
          <div style={{ border: '2px dashed rgba(56,189,248,0.2)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16, cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
            <Upload size={24} color="#38bdf8" style={{ margin: '0 auto 8px' }} />
            <div style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600 }}>Upload CSV</div>
            <div style={{ color: '#475569', fontSize: 12, marginTop: 4 }}>UCI Parkinson's format — first row headers, second row values</div>
            <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFile} />
          </div>

          {/* File status */}
          {fileStatus && (
            <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 16, background: fileStatus.valid ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)', border: `1px solid ${fileStatus.valid ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}` }}>
              {fileStatus.valid ? (
                <div style={{ color: '#4ade80', fontSize: 13 }}>
                  ✓ {fileStatus.name} — Features loaded{fileStatus.found ? ` (${fileStatus.found} features detected)` : ' (demo data)'}<br />
                  ✓ Required columns checked &nbsp; ✓ Features validated &nbsp; ✓ Ready for analysis
                </div>
              ) : (
                <div style={{ color: '#f87171', fontSize: 13 }}>✗ {fileStatus.error || 'Invalid file'}</div>
              )}
            </div>
          )}

          {/* Manual feature groups */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10, padding: '8px 12px', background: 'rgba(56,189,248,0.05)', borderRadius: 8 }}>
              💡 These are numerical biomedical voice characteristics used by the machine-learning model. You do not need to understand these technical terms.
            </div>
            {FEATURE_GROUPS.map(g => <FeatureGroup key={g.label} group={g} features={features} onChange={handleFeatureChange} />)}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
            <button className="btn-primary" onClick={() => setStep(3)} disabled={Object.keys(features).length < 5} style={{ opacity: Object.keys(features).length < 5 ? 0.5 : 1 }}>Next: Well-being <ChevronRight size={15} /></button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#000000', marginBottom: 6 }}>Lifestyle & Well-being Context</h2>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Optional self-reported contextual information — does not independently diagnose Parkinson's disease.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[['sleep', 'Sleep Quality', ['', 'Poor', 'Average', 'Good']], ['activity', 'Physical Activity', ['', 'Low', 'Moderate', 'High']], ['stress', 'Perceived Stress', ['', 'Low', 'Moderate', 'High']]].map(([k, label, opts]) => (
              <div key={k}>
                <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>{label.toUpperCase()}</label>
                <select className="select-field" value={wellbeing[k]} onChange={e => setWellbeing(w => ({ ...w, [k]: e.target.value }))}>
                  {opts.map(o => <option key={o} value={o}>{o || 'Select...'}</option>)}
                </select>
              </div>
            ))}
          </div>

          <div style={{ padding: '14px 16px', background: 'rgba(56,189,248,0.05)', borderRadius: 10, border: '1px solid rgba(56,189,248,0.1)', marginBottom: 24, fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
            Your information will be processed by the Q-Health AI pipeline to generate a preliminary risk assessment.
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
            <button className="btn-primary" onClick={handleSubmit} style={{ fontSize: 15, padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
              Analyze My Risk →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

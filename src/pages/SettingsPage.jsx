import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({ notifications: true, disclaimer: true, units: 'metric' });
  const toggle = (k) => setSettings(s => ({ ...s, [k]: !s[k] }));

  return (
    <div style={{ padding: '32px', maxWidth: 600, margin: '0 auto' }} className="animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#000000', margin: 0, marginBottom: 28 }}>Settings</h1>

      <div className="glass-card" style={{ padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Preferences</h3>
        {[
          ['notifications', 'Assessment Reminders', 'Receive reminders to complete periodic assessments.'],
          ['disclaimer', 'Show Medical Disclaimer', 'Always display the medical disclaimer on result pages.'],
        ].map(([key, label, desc]) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(56,189,248,0.07)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{label}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{desc}</div>
            </div>
            <button onClick={() => toggle(key)} style={{ width: 44, height: 24, borderRadius: 12, background: settings[key] ? 'linear-gradient(135deg,#0ea5e9,#06b6d4)' : 'rgba(56,189,248,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: settings[key] ? 23 : 3, transition: 'left 0.2s' }} />
            </button>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>About Q-Health</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Version', '1.0.0 (SIH Prototype)'], ['Dataset', 'UCI Parkinson\'s Dataset (174)'], ['Quantum Backend', 'Qiskit FidelityQuantumKernel + QSVC'], ['Classical Models', 'SVM, Random Forest (scikit-learn)']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(56,189,248,0.06)', fontSize: 13 }}>
              <span style={{ color: '#64748b' }}>{k}</span>
              <span style={{ color: '#94a3b8' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

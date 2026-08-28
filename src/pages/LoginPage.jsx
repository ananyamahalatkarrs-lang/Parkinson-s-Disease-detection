import { Activity, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const [name, setName] = useState('');
  const [pid, setPid] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please enter your name.'); return; }
    login(name.trim());
  };

  const handleDemo = () => login('Alex Morgan');

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 20% 50%, rgba(29,78,216,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(14,165,233,0.05) 0%, transparent 50%), #f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      {/* Background grid */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(29,78,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(29,78,216,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg,#1d4ed8,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900, color: 'white', margin: '0 auto 16px' }}>Q</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#000000', margin: 0 }}>Q-Health</h1>
          <p style={{ color: '#4b6a8a', fontSize: 13, marginTop: 6, fontWeight: 600 }}>Hybrid Quantum-Classical AI · Parkinson's Risk Assessment</p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#000000', marginBottom: 6 }}>Patient Sign In</h2>
          <p style={{ color: '#4b6a8a', fontSize: 13, marginBottom: 24 }}>Access your personalised risk assessment dashboard.</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: '#1d4ed8', fontWeight: 700, display: 'block', marginBottom: 6 }}>FULL NAME</label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input className="input-field" style={{ paddingLeft: 36 }} placeholder="Enter your name" value={name} onChange={e => { setName(e.target.value); setError(''); }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#1d4ed8', fontWeight: 700, display: 'block', marginBottom: 6 }}>PATIENT ID <span style={{ color: '#64748b', fontWeight: 400 }}>(optional)</span></label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input className="input-field" style={{ paddingLeft: 36 }} placeholder="QH-YYYY-XXXX" value={pid} onChange={e => setPid(e.target.value)} />
              </div>
            </div>
            {error && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: 15, marginTop: 4 }}>Sign In →</button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(29,78,216,0.15)' }} />
            <span style={{ color: '#64748b', fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(29,78,216,0.15)' }} />
          </div>

          <button onClick={handleDemo} className="btn-secondary" style={{ width: '100%', padding: '12px', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Activity size={16} />
            Load Demo Patient (SIH Demo)
          </button>

          <p style={{ color: '#4b6a8a', fontSize: 11, textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
            Q-Health is a research prototype for preliminary risk assessment only. Not a medical diagnostic device.
          </p>
        </div>
      </div>
    </div>
  );
}

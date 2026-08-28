import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const NAV = [
  { id: 'dashboard',   label: 'Dashboard',       emoji: '🏠' },
  { id: 'assessment',  label: 'New Assessment',   emoji: '🧠' },
  { id: 'results',     label: 'My Results',       emoji: '📊' },
  { id: 'history',     label: 'Health History',   emoji: '📈' },
  { id: 'profile',     label: 'My Profile',       emoji: '👤' },
  { id: 'privacy',     label: 'Privacy & Safety', emoji: '🔒' },
];

export default function Sidebar() {
  const { activePage, setActivePage } = useApp();

  return (
    <aside style={{
      width: 230,
      minHeight: '100vh',
      background: '#ffffff',
      borderRight: '1px solid rgba(59,130,246,0.15)',
      boxShadow: '2px 0 12px rgba(59,130,246,0.07)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 12px',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
    }}>
      {/* Logo */}
      <div style={{ padding: '0 8px 24px', borderBottom: '1px solid rgba(59,130,246,0.12)', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg,#1d4ed8,#0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 900, color: 'white',
          }}>Q</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#000000' }}>Q-Health</div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: -1 }}>Hybrid Quantum AI</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(({ id, label, emoji }) => (
          <button
            key={id}
            className={`sidebar-link${activePage === id ? ' active' : ''}`}
            onClick={() => setActivePage(id)}
          >
            <span style={{ fontSize: 16 }}>{emoji}</span>
            {label}
          </button>
        ))}

        {/* Portal Switcher Link */}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(59,130,246,0.12)' }}>
          <Link
            to="/clinician/dashboard"
            className="sidebar-link"
            style={{ color: '#2563eb', fontWeight: 700 }}
          >
            <span style={{ fontSize: 16 }}>🩺</span>
            Clinician Portal
          </Link>
        </div>
      </nav>

      {/* Bottom badge */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(59,130,246,0.1)', marginTop: 8 }}>
        <div style={{ fontSize: 10, color: '#94a3b8', lineHeight: 1.6 }}>
          SIH 2026 Prototype<br />
          <span style={{ color: '#93c5fd' }}>Not a medical device</span>
        </div>
      </div>
    </aside>
  );
}

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Stethoscope, Atom, ShieldCheck } from 'lucide-react';

export function RoleSwitcher() {
  const { currentUser, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser) return null;

  const currentRole = (currentUser?.role || '').toLowerCase();

  const roles = [
    { key: 'Patient', label: 'Patient', path: '/patient/dashboard', icon: User, color: '#2563EB' },
    { key: 'Clinician', label: 'Doctor', path: '/clinician/dashboard', icon: Stethoscope, color: '#0EA5E9' },
    { key: 'Researcher', label: 'Researcher', path: '/researcher/dashboard', icon: Atom, color: '#7C3AED' },
    { key: 'Admin', label: 'Admin', path: '/admin/dashboard', icon: ShieldCheck, color: '#10B981' }
  ];

  const handleRoleSwitch = (targetRole, targetPath) => {
    switchRole(targetRole);
    navigate(targetPath, { replace: true });
  };

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      backgroundColor: '#F1F5F9',
      padding: '0.25rem 0.35rem',
      borderRadius: '20px',
      border: '1px solid #E2E8F0'
    }}>
      <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B', padding: '0 0.4rem' }} className="font-mono">
        WORKSPACE:
      </span>
      {roles.map(r => {
        const Icon = r.icon;
        const isActive = location.pathname.startsWith(r.path.replace('/dashboard', '')) || currentRole.includes(r.key.toLowerCase());
        return (
          <button
            key={r.key}
            onClick={() => handleRoleSwitch(r.key, r.path)}
            title={`Switch to ${r.label} Workspace`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.6rem',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: isActive ? r.color : 'transparent',
              color: isActive ? '#FFFFFF' : '#475569',
              fontSize: '0.75rem',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Icon size={13} />
            <span>{r.label}</span>
          </button>
        );
      })}
    </div>
  );
}

import React from 'react';
import { UserCheck, Stethoscope, Atom, ShieldCheck } from 'lucide-react';

export const RoleSelector = ({ selectedRole = 'Patient', onSelectRole, label = 'SELECT YOUR ROLE' }) => {
  const roles = [
    {
      id: 'Patient',
      title: 'Patient / Individual',
      subtitle: 'Personal Risk Telemetry & Health History',
      icon: UserCheck
    },
    {
      id: 'Clinician',
      title: 'Doctor / Clinician',
      subtitle: 'Clinical Decision Support & Patient Monitoring',
      icon: Stethoscope
    },
    {
      id: 'Researcher',
      title: 'Researcher',
      subtitle: 'Quantum ML Lab & Dataset Analytics',
      icon: Atom
    },
    {
      id: 'Admin',
      title: 'Administrator',
      subtitle: 'System Control Center & Audit Telemetry',
      icon: ShieldCheck
    }
  ];

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.725rem',
        fontWeight: 700,
        color: 'var(--text-muted)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginBottom: '0.65rem'
      }} className="font-mono">
        {label}
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = (selectedRole || '').toLowerCase() === r.id.toLowerCase() ||
                             (selectedRole === 'Doctor' && r.id === 'Clinician');

          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onSelectRole && onSelectRole(r.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                padding: '0.75rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected ? 'var(--bg-very-light-blue)' : '#FFFFFF',
                border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border)',
                color: isSelected ? 'var(--primary-blue)' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease-in-out'
              }}
            >
              <Icon size={20} color={isSelected ? 'var(--primary-blue)' : '#94A3B8'} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  color: isSelected ? 'var(--primary-blue)' : 'var(--text-primary)'
                }}>
                  {r.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                  {r.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

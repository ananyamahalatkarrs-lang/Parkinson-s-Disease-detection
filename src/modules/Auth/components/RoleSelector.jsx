import React from 'react';
import { Stethoscope } from 'lucide-react';

export const RoleSelector = ({ selectedRole = 'Clinician', onSelectRole, label = 'Account Role' }) => {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        marginBottom: '0.5rem'
      }}>
        {label}
      </label>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-very-light-blue)',
        border: '2px solid var(--primary-blue)',
        color: 'var(--primary-blue)'
      }}>
        <Stethoscope size={20} color="var(--primary-blue)" />
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Doctor / Clinician
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Clinical Decision Support & Patient Monitoring
          </div>
        </div>
      </div>
    </div>
  );
};

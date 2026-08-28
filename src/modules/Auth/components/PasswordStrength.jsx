import React from 'react';
import { getPasswordStrength } from '../utils/validation';

export const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const strength = getPasswordStrength(password);

  const getBarColor = () => {
    if (strength.label === 'Weak') return 'var(--danger)';
    if (strength.label === 'Medium') return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div style={{ marginTop: '-0.5rem', marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Password Strength:</span>
        <span style={{ fontSize: '0.725rem', fontWeight: 700, color: getBarColor() }} className="font-mono">
          {strength.label}
        </span>
      </div>

      <div style={{
        height: '4px',
        width: '100%',
        backgroundColor: '#E2E8F0',
        borderRadius: '2px',
        overflow: 'hidden',
        display: 'flex',
        gap: '2px'
      }}>
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: level <= strength.score ? getBarColor() : 'transparent',
              transition: 'background-color 0.2s ease'
            }}
          />
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.25rem 0.5rem',
        marginTop: '0.5rem',
        fontSize: '0.7rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ color: strength.checks.length ? 'var(--success)' : 'var(--text-muted)' }}>
          {strength.checks.length ? '✓' : '○'} Min 8 characters
        </div>
        <div style={{ color: strength.checks.uppercase ? 'var(--success)' : 'var(--text-muted)' }}>
          {strength.checks.uppercase ? '✓' : '○'} Uppercase letter
        </div>
        <div style={{ color: strength.checks.lowercase ? 'var(--success)' : 'var(--text-muted)' }}>
          {strength.checks.lowercase ? '✓' : '○'} Lowercase letter
        </div>
        <div style={{ color: strength.checks.number || strength.checks.special ? 'var(--success)' : 'var(--text-muted)' }}>
          {strength.checks.number || strength.checks.special ? '✓' : '○'} Number or symbol
        </div>
      </div>
    </div>
  );
};

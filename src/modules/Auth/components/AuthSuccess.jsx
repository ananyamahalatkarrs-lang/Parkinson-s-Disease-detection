import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const AuthSuccess = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      padding: '0.85rem 1rem',
      backgroundColor: 'rgba(16, 185, 129, 0.08)',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--success)',
      fontSize: '0.825rem',
      lineHeight: 1.5,
      marginBottom: '1.25rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.65rem'
    }}>
      <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
      <div>{message}</div>
    </div>
  );
};

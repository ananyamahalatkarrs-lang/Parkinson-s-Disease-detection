import React from 'react';
import { AlertCircle } from 'lucide-react';

export const AuthError = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      padding: '0.85rem 1rem',
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
      border: '1px solid rgba(239, 68, 68, 0.25)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--danger)',
      fontSize: '0.825rem',
      lineHeight: 1.5,
      marginBottom: '1.25rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.65rem'
    }}>
      <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
      <div>{message}</div>
    </div>
  );
};

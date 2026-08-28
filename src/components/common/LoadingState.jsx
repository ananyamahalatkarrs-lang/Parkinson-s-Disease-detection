import React from 'react';

export const LoadingState = ({ message = 'Loading system telemetry...', rows = 4 }) => {
  return (
    <div style={{
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      width: '100%'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid var(--border)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="font-mono">
        {message}
      </span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

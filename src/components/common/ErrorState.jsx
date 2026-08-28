import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({
  title = 'Service Connection Error',
  message = 'Failed to load telemetry data from system service. Please try again.',
  onRetry
}) => {
  return (
    <div className="card-base" style={{
      padding: '2rem',
      borderColor: 'rgba(255, 107, 107, 0.3)',
      backgroundColor: 'rgba(255, 107, 107, 0.05)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem'
    }}>
      <div style={{
        color: 'var(--danger)',
        padding: '0.4rem',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'rgba(255, 107, 107, 0.15)'
      }}>
        <AlertCircle size={24} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--danger)', marginBottom: '0.25rem' }}>
          {title}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          {message}
        </p>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-secondary btn-sm">
            <RefreshCw size={14} /> Retry Connection
          </button>
        )}
      </div>
    </div>
  );
};

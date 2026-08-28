import React from 'react';
import { Database } from 'lucide-react';

export const EmptyState = ({
  title = 'No Data Available',
  description = 'There are no records matching your selected query or filters.',
  icon: Icon = Database,
  action
}) => {
  return (
    <div className="card-base" style={{
      padding: '3.5rem 2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem'
    }}>
      <div style={{
        padding: '1rem',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-muted)',
        marginBottom: '0.5rem',
        border: '1px solid var(--border)'
      }}>
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.5 }}>
        {description}
      </p>
      {action && <div style={{ marginTop: '0.75rem' }}>{action}</div>}
    </div>
  );
};

import React from 'react';

export const PageHeader = ({ title, subtitle, breadcrumb, actions }) => {
  return (
    <div style={{
      marginBottom: '1.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      {breadcrumb && (
        <div style={{
          fontSize: '0.775rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }} className="font-mono">
          {breadcrumb}
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.65rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.2
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              marginTop: '0.35rem'
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

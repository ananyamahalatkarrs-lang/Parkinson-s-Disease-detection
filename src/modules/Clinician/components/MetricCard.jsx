import React from 'react';

export const MetricCard = ({ title, value, subtitle, icon: Icon, badge }) => {
  return (
    <div className="card-base" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-secondary)'
          }}>
            {title}
          </span>
          {Icon && (
            <div style={{
              color: 'var(--primary-blue)',
              backgroundColor: 'var(--bg-light-blue)',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={18} />
            </div>
          )}
        </div>

        <div style={{
          fontSize: '1.85rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: '0.35rem'
        }}>
          {value}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.775rem',
        color: 'var(--text-muted)',
        marginTop: '0.5rem'
      }}>
        {subtitle && <span>{subtitle}</span>}
        {badge && (
          <span className={`badge ${badge.variant ? `badge-${badge.variant}` : 'badge-info'} ${badge.isMono ? 'font-mono' : ''}`}>
            {badge.text}
          </span>
        )}
      </div>
    </div>
  );
};

import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendText,
  isMono = false,
  badge,
  quantumHighlight = false
}) => {
  return (
    <div
      className="card-base"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderColor: quantumHighlight ? 'rgba(53, 214, 232, 0.4)' : 'var(--border)'
      }}
    >
      {quantumHighlight && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(53, 214, 232, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />
      )}

      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-secondary)'
          }}>
            {title}
          </span>
          {Icon && (
            <div style={{
              color: quantumHighlight ? 'var(--quantum)' : 'var(--primary)',
              backgroundColor: quantumHighlight ? 'rgba(53, 214, 232, 0.1)' : 'rgba(76, 141, 255, 0.1)',
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
          fontSize: '1.75rem',
          fontWeight: 700,
          color: quantumHighlight ? 'var(--quantum)' : 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: '0.4rem',
          fontFamily: isMono ? 'var(--font-mono)' : 'var(--font-primary)'
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
        {trend && (
          <span style={{
            color: trend === 'up' ? 'var(--success)' : trend === 'down' ? 'var(--danger)' : 'var(--text-muted)',
            fontWeight: 600
          }}>
            {trendText}
          </span>
        )}
      </div>
    </div>
  );
};

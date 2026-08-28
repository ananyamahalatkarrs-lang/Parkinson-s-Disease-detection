import React from 'react';
import { Lock } from 'lucide-react';
import { BRAND_TEXT } from '../utils/authConstants';

export const AuthCard = ({ title, subtitle, children, showTrustBadge = true }) => {
  return (
    <div
      className="card-base"
      style={{
        maxWidth: '460px',
        width: '100%',
        position: 'relative'
      }}
    >
      {title && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.2
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginTop: '0.35rem',
              lineHeight: 1.5
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}

      {showTrustBadge && (
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          fontSize: '0.775rem',
          color: 'var(--text-muted)'
        }}>
          <Lock size={13} color="var(--text-muted)" />
          <span>{BRAND_TEXT.TRUST_BADGE}</span>
        </div>
      )}
    </div>
  );
};

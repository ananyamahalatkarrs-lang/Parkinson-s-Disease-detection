import React from 'react';

export const RiskDistributionChart = () => {
  const distributionData = [
    { label: 'Low Risk Indicator', count: 64, percentage: 50, color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.1)' },
    { label: 'Moderate Risk Indicator', count: 48, percentage: 37.5, color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.1)' },
    { label: 'Elevated Risk Pattern', count: 16, percentage: 12.5, color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.1)' }
  ];

  return (
    <div className="card-base" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Cohort Risk Distribution
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
            Multi-modal model indicator distribution across enrolled cohort (N = 128)
          </p>
        </div>
        <span className="badge badge-info font-mono">MODEL DIST</span>
      </div>

      {/* Progress Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {distributionData.map((item, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
              <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>
                <strong>{item.count}</strong> ({item.percentage}%)
              </span>
            </div>

            <div style={{
              height: '8px',
              width: '100%',
              backgroundColor: 'var(--bg-main)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${item.percentage}%`,
                backgroundColor: item.color,
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1.25rem',
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--border)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }} className="font-mono">
        INDICATORS ARE DECISION-SUPPORT VALUES; NON-DIAGNOSTIC
      </div>
    </div>
  );
};

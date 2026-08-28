import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { fetchFeatures } from '../../api';

const FeatureAnalysis = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchFeatures().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Feature Analysis</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <Card title="Feature Importance (Classical vs Quantum)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(data.importance['Classical (RF)']).map(feature => (
              <div key={feature}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>{feature}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1, height: '8px', background: 'var(--bg-light-blue)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${data.importance['Classical (RF)'][feature] * 100}%`, background: 'var(--brand-primary)' }} title={`Classical: ${(data.importance['Classical (RF)'][feature]*100).toFixed(1)}%`}></div>
                  </div>
                  <div style={{ flex: 1, height: '8px', background: 'var(--bg-light-blue)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${data.importance['Quantum (VQC)'][feature] * 100}%`, background: 'var(--accent-cyan)' }} title={`Quantum: ${(data.importance['Quantum (VQC)'][feature]*100).toFixed(1)}%`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px', fontSize: 'var(--text-small)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--brand-primary)' }}></div>
              Classical (RF)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--accent-cyan)' }}></div>
              Quantum (VQC)
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default FeatureAnalysis;

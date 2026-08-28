import React, { useEffect, useState } from 'react';
import { Card, MetricCard } from '../../components/Card';
import { fetchPerformance } from '../../api';

const PerformanceMetrics = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchPerformance().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Performance & Infrastructure</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <Card title="Inference Latency (ms)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(data.inference_latency_ms).map(model => (
              <div key={model}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>{model}</span>
                  <span style={{ fontSize: 'var(--text-small)', fontWeight: 'bold' }}>{data.inference_latency_ms[model]} ms</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-light-blue)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${Math.min(data.inference_latency_ms[model] / 2, 100)}%`, background: model === 'Classical' ? 'var(--brand-primary)' : 'var(--status-warning)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Training Time (s)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(data.training_time_s).map(model => (
              <div key={model}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>{model}</span>
                  <span style={{ fontSize: 'var(--text-small)', fontWeight: 'bold' }}>{data.training_time_s[model]} s</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-light-blue)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${Math.min(data.training_time_s[model], 100)}%`, background: model === 'Classical' ? 'var(--brand-primary)' : 'var(--status-danger)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default PerformanceMetrics;

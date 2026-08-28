import React, { useEffect, useState } from 'react';
import { Card, MetricCard } from '../../components/Card';
import { fetchCircuit } from '../../api';

const CircuitVisualization = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchCircuit().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Quantum Circuit Visualization</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <MetricCard title="Qubit Count" value={data.qubit_count} highlight />
        <MetricCard title="Gate Count" value={data.gate_count} />
        <MetricCard title="Circuit Depth" value={data.depth} />
      </div>

      <Card title="Circuit Architecture Diagram">
        <div style={{ padding: '24px', background: 'var(--text-primary)', color: 'var(--accent-electric-cyan)', fontFamily: 'var(--font-mono)', borderRadius: '8px', overflowX: 'auto', whiteSpace: 'pre' }}>
          {`
q0 ──RY────●────RX────
           │
q1 ──RY────X────RX────
           ✦
q2 ──RY────●────RZ────
           │
q3 ──RY────X────RZ────
          `}
        </div>
        <p style={{ marginTop: '16px', fontSize: 'var(--text-small)', color: 'var(--text-muted)' }}>
          * Simplified logical view of the parameterized variational quantum classifier used in hybrid mode.
        </p>
      </Card>
    </div>
  );
};
export default CircuitVisualization;

import React, { useEffect, useState } from 'react';
import { Card, MetricCard } from '../../components/Card';
import { Table } from '../../components/Table';
import { fetchDashboard } from '../../api';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDashboard().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Research Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <MetricCard title="Dataset Size (Rows)" value={data.dataset_size} />
        <MetricCard title="Experiments Run" value={data.experiments_run} />
        <MetricCard title="Best Quantum Acc" value={(data.best_accuracy.quantum * 100).toFixed(1) + '%'} highlight />
        <MetricCard title="Last Run" value={new Date(data.last_run).toLocaleDateString()} />
      </div>

      <Card title="Recent Experiments">
        <Table 
          headers={['Run ID', 'Date', 'Model Type', 'Accuracy', 'Status']}
          rows={data.recent_experiments.map((e: any) => [
            <span style={{fontFamily: 'var(--font-mono)'}}>{e.run_id}</span>,
            new Date(e.timestamp).toLocaleDateString(),
            e.model_type,
            (e.metrics.accuracy * 100).toFixed(2) + '%',
            <span style={{color: e.status === 'success' ? 'var(--status-success)' : 'var(--status-danger)'}}>{e.status}</span>
          ])}
        />
      </Card>
    </div>
  );
};
export default Dashboard;

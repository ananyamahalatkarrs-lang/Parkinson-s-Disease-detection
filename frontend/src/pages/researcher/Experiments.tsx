import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { fetchExperiments } from '../../api';

const Experiments = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchExperiments().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Experiment Tracker</h1>
      
      <Card title="All Logged Runs">
        <Table 
          headers={['Run ID', 'Date', 'Model Type', 'Hyperparameters', 'Accuracy', 'Status']}
          rows={data.map((e: any) => [
            <span style={{fontFamily: 'var(--font-mono)'}}>{e.run_id}</span>,
            new Date(e.timestamp).toLocaleDateString() + ' ' + new Date(e.timestamp).toLocaleTimeString(),
            <strong style={{color: e.model_type !== 'Classical' ? 'var(--accent-violet)' : 'inherit'}}>{e.model_type}</strong>,
            <span style={{fontSize: 'var(--text-small)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)'}}>{Object.entries(e.hyperparameters).map(([k, v]: [string, any]) => `${k}: ${v}`).join(', ')}</span>,
            e.metrics.accuracy ? (e.metrics.accuracy * 100).toFixed(2) + '%' : 'N/A',
            <span style={{color: e.status === 'success' ? 'var(--status-success)' : 'var(--status-danger)'}}>{e.status}</span>
          ])}
        />
      </Card>
    </div>
  );
};
export default Experiments;

import React, { useEffect, useState } from 'react';
import { Card, MetricCard } from '../../components/Card';
import { Table } from '../../components/Table';
import { fetchDataset } from '../../api';

const DatasetInfo = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDataset().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dataset Information</h1>
      <h3 style={{color: 'var(--text-secondary)', marginBottom: '32px'}}>{data.name}</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <MetricCard title="Source" value={data.source} />
        <MetricCard title="Total Rows" value={data.rows} />
        <MetricCard title="Total Features" value={data.cols} />
        <MetricCard title="Healthy (0)" value={data.class_balance['0']} />
        <MetricCard title="Parkinson's (1)" value={data.class_balance['1']} highlight />
      </div>

      <Card title="Feature Schema">
        <Table 
          headers={['Feature Name', 'Data Type', 'Missing Values']}
          rows={data.features.map((f: any) => [
            <span style={{fontFamily: 'var(--font-mono)'}}>{f.name}</span>,
            f.dtype,
            data.missing_values[f.name] || 0
          ])}
        />
      </Card>
    </div>
  );
};
export default DatasetInfo;

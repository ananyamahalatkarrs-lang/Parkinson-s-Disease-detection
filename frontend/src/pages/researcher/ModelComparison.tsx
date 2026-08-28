import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { fetchComparison } from '../../api';

const ModelComparison = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchComparison().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Model Comparison</h1>
      <Card title="Overall Metrics">
        <Table 
          headers={['Model', 'Accuracy', 'Precision', 'Recall', 'F1 Score', 'ROC-AUC']}
          rows={data.map((m: any) => [
            <strong style={{color: m.model.includes('Quantum') || m.model.includes('Hybrid') ? 'var(--accent-violet)' : 'inherit'}}>{m.model}</strong>,
            (m.accuracy * 100).toFixed(2) + '%',
            (m.precision * 100).toFixed(2) + '%',
            (m.recall * 100).toFixed(2) + '%',
            (m.f1 * 100).toFixed(2) + '%',
            m.roc_auc.toFixed(4)
          ])}
        />
      </Card>
    </div>
  );
};
export default ModelComparison;

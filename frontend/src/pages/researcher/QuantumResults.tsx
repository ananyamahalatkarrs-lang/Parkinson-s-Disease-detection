import React, { useEffect, useState } from 'react';
import { Card, MetricCard } from '../../components/Card';
import { fetchQuantum } from '../../api';

const QuantumResults = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchQuantum().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Quantum ML Results</h1>
      <h3 style={{color: 'var(--text-secondary)', marginBottom: '32px'}}>Model: <span style={{color: 'var(--accent-electric-violet)'}}>{data.model_used}</span></h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <MetricCard title="Accuracy" value={(data.metrics.accuracy * 100).toFixed(2) + '%'} highlight />
        <MetricCard title="Precision" value={(data.metrics.precision * 100).toFixed(2) + '%'} />
        <MetricCard title="Recall" value={(data.metrics.recall * 100).toFixed(2) + '%'} />
        <MetricCard title="F1 Score" value={(data.metrics.f1 * 100).toFixed(2) + '%'} />
        <MetricCard title="ROC-AUC" value={(data.metrics.roc_auc).toFixed(4)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <Card title="Training Loss Curve">
          {data.training_loss && data.training_loss.map((l: number, i: number) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', marginBottom: '4px'}}>
              <div style={{width: '60px', color: 'var(--text-muted)'}}>Ep {i+1}</div>
              <div style={{height: '10px', background: 'var(--accent-cyan)', width: `${l * 100}%`}}></div>
              <div style={{marginLeft: '8px'}}>{l.toFixed(3)}</div>
            </div>
          ))}
        </Card>
        <Card title="Confusion Matrix">
          <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
            <div style={{textAlign: 'right', fontWeight: 'bold', width: '80px'}}>True Label</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: 'var(--border-color)', padding: '4px'}}>
              <div style={{background: 'var(--bg-white)', padding: '16px', textAlign: 'center'}}>{data.metrics.confusion_matrix[0][0]}</div>
              <div style={{background: 'var(--bg-white)', padding: '16px', textAlign: 'center'}}>{data.metrics.confusion_matrix[0][1]}</div>
              <div style={{background: 'var(--bg-white)', padding: '16px', textAlign: 'center'}}>{data.metrics.confusion_matrix[1][0]}</div>
              <div style={{background: 'var(--bg-white)', padding: '16px', textAlign: 'center'}}>{data.metrics.confusion_matrix[1][1]}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default QuantumResults;

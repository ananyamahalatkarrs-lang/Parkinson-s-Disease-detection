import { useApp } from '../context/AppContext';

export default function ResultsPage() {
  const { results, setCurrentResult, setActivePage } = useApp();

  const viewResult = (r) => {
    setCurrentResult(r);
    setActivePage('result');
  };

  return (
    <div style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }} className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#000000', margin: 0 }}>My Results</h1>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 6 }}>Your assessment history and risk scores over time.</p>
        </div>
        <button className="btn-primary" onClick={() => setActivePage('assessment')}>+ New Assessment</button>
      </div>

      {results.length === 0 ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📊</div>
          <p style={{ color: '#64748b' }}>No assessments yet. Start your first assessment.</p>
          <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setActivePage('assessment')}>Start Assessment</button>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(56,189,248,0.1)' }}>
                {['Date', 'Risk Level', 'Risk Score', 'Hybrid Model', 'Action'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => {
                const c = r.riskLevel === 'High' ? '#f87171' : r.riskLevel === 'Moderate' ? '#fbbf24' : '#4ade80';
                return (
                  <tr key={r.id} style={{ borderBottom: i < results.length - 1 ? '1px solid rgba(56,189,248,0.06)' : 'none', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#94a3b8' }}>{r.date}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: c, background: `${c}15`, padding: '4px 10px', borderRadius: 6 }}>{r.riskLevel}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#94a3b8' }}>{r.riskScore}%</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: r.hybrid?.result?.includes('Elevated') ? '#fbbf24' : '#4ade80' }}>{r.hybrid?.result || '—'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <button className="btn-secondary" style={{ fontSize: 12, padding: '6px 14px' }} onClick={() => viewResult(r)}>View Details →</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

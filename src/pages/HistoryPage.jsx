import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useApp } from '../context/AppContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const c = payload[0].value >= 60 ? '#f87171' : payload[0].value >= 40 ? '#fbbf24' : '#4ade80';
  return (
    <div style={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: '#94a3b8', fontSize: 12, margin: '0 0 4px' }}>{label}</p>
      <p style={{ color: c, fontSize: 16, fontWeight: 700, margin: 0 }}>{payload[0].value}%</p>
    </div>
  );
};

export default function HistoryPage() {
  const { results } = useApp();

  const chartData = [...results].reverse().map(r => ({ date: r.date.split(' ').slice(0, 2).join(' '), score: r.riskScore, level: r.riskLevel }));

  return (
    <div style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }} className="animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#000000', margin: 0 }}>Health History</h1>
      <p style={{ color: '#64748b', fontSize: 14, marginTop: 6, marginBottom: 28 }}>Track your model risk score over time.</p>

      <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#000000', margin: 0 }}>Model Risk Score Over Time</h2>
          <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
            <span style={{ color: '#4ade80' }}>● Low (&lt;40%)</span>
            <span style={{ color: '#fbbf24' }}>● Moderate (40–60%)</span>
            <span style={{ color: '#f87171' }}>● High (&gt;60%)</span>
          </div>
        </div>

        {chartData.length < 2 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#475569' }}>Complete at least 2 assessments to see your trend.</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.08)" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: 'rgba(56,189,248,0.1)' }} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={2.5} dot={{ fill: '#38bdf8', r: 5, strokeWidth: 0 }} activeDot={{ r: 7, fill: '#22d3ee' }} />
            </LineChart>
          </ResponsiveContainer>
        )}

        <p style={{ color: '#475569', fontSize: 12, marginTop: 16, fontStyle: 'italic' }}>
          Changes in the model score do not necessarily represent a change in your medical condition.
        </p>
      </div>

      {/* Summary table */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#000000', marginBottom: 16 }}>Assessment Summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {results.map((r) => {
            const c = r.riskLevel === 'High' ? '#f87171' : r.riskLevel === 'Moderate' ? '#fbbf24' : '#4ade80';
            return (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(56,189,248,0.03)', borderRadius: 8, border: '1px solid rgba(56,189,248,0.07)' }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{r.date}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 80, height: 6, background: 'rgba(56,189,248,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${r.riskScore}%`, background: c, borderRadius: 3 }} />
                  </div>
                  <span style={{ color: c, fontSize: 13, fontWeight: 700, width: 36 }}>{r.riskScore}%</span>
                </div>
                <span style={{ color: c, fontSize: 13, fontWeight: 600 }}>{r.riskLevel}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

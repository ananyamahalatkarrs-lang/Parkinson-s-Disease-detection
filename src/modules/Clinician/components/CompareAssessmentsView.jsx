import React, { useState } from 'react';
import { ArrowRightLeft, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

export const CompareAssessmentsView = ({ patient }) => {
  const history = patient?.assessmentHistory || [];

  const [dateA, setDateA] = useState(history[0]?.id || 'ASM-9021');
  const [dateB, setDateB] = useState(history[1]?.id || 'ASM-8810');

  const asmA = history.find(a => a.id === dateA) || history[0];
  const asmB = history.find(a => a.id === dateB) || history[1] || history[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Selector Header Card */}
      <div className="card-base" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Side-by-Side Assessment Comparison
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Compare telemetry indicators and feature changes between two assessment dates.
            </p>
          </div>

          <span className="badge badge-info font-mono">
            COMPARE ASSESSMENTS
          </span>
        </div>

        {/* Date Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '1rem', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Select Assessment A (Recent)
            </label>
            <select
              value={dateA}
              onChange={(e) => setDateA(e.target.value)}
              className="select-field font-mono"
            >
              {history.map(a => (
                <option key={a.id} value={a.id}>{a.id} — {a.date} ({a.type})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1.25rem', color: 'var(--primary-blue)' }}>
            <ArrowRightLeft size={22} />
          </div>

          <div>
            <label style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Select Assessment B (Prior / Baseline)
            </label>
            <select
              value={dateB}
              onChange={(e) => setDateB(e.target.value)}
              className="select-field font-mono"
            >
              {history.map(a => (
                <option key={a.id} value={a.id}>{a.id} — {a.date} ({a.type})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* "What Has Changed" Summary Banner */}
      <div style={{
        padding: '1rem 1.25rem',
        backgroundColor: 'var(--bg-very-light-blue)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        fontSize: '0.85rem'
      }}>
        <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <TrendingUp size={18} color="var(--primary-blue)" /> WHAT HAS CHANGED BETWEEN THESE ASSESSMENTS?
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Motor Tremor Delta increased by <strong>+0.28</strong> between {asmB?.date} and {asmA?.date}. Acoustic Formant Spectrum remained stable within baseline limits. Overall risk indicator score shifted from <strong>{asmB?.trendScore || 40}</strong> to <strong>{asmA?.trendScore || 42}</strong>.
        </p>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Assessment A Column */}
        <div className="card-base" style={{ padding: '1.25rem', borderTop: '4px solid var(--primary-blue)' }}>
          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>ASSESSMENT A</div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{asmA?.id}</h4>
          <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}>{asmA?.date}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Evaluation Type:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{asmA?.type}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Risk Indicator Level:</span>
              <div style={{ marginTop: '0.2rem' }}>
                <Badge variant={asmA?.risk === 'Elevated' ? 'danger' : 'warning'}>{asmA?.risk}</Badge>
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Model Output Telemetry:</span>
              <div className="font-mono" style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{asmA?.modelOutput}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Composite Trend Score:</span>
              <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-blue)' }}>{asmA?.trendScore} / 100</div>
            </div>
          </div>
        </div>

        {/* Assessment B Column */}
        <div className="card-base" style={{ padding: '1.25rem', borderTop: '4px solid var(--cyan)' }}>
          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>ASSESSMENT B</div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{asmB?.id}</h4>
          <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--cyan)', marginBottom: '1rem' }}>{asmB?.date}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Evaluation Type:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{asmB?.type}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Risk Indicator Level:</span>
              <div style={{ marginTop: '0.2rem' }}>
                <Badge variant={asmB?.risk === 'Elevated' ? 'danger' : 'success'}>{asmB?.risk}</Badge>
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Model Output Telemetry:</span>
              <div className="font-mono" style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{asmB?.modelOutput}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Composite Trend Score:</span>
              <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--cyan)' }}>{asmB?.trendScore} / 100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

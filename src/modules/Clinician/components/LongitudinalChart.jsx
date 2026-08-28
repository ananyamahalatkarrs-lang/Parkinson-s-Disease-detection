import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export const LongitudinalChart = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card-base" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Assessment Trend Over Time
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Longitudinal score variations across multi-modal assessment dates
          </p>
        </div>

        <div className="badge badge-info font-mono">
          LONGITUDINAL TELEMETRY
        </div>
      </div>

      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} fontFamily="IBM Plex Mono" />
            <YAxis stroke="#94A3B8" fontSize={11} fontFamily="IBM Plex Mono" domain={[0, 60]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                borderRadius: '8px',
                color: '#0F172A',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey="currentSeries"
              name="Composite Assessment Trend"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#2563EB' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="quantumVariational"
              name="QML Variational Score"
              stroke="#06B6D4"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#06B6D4' }}
            />
            <Line
              type="monotone"
              dataKey="baseline"
              name="Cohort Baseline Avg"
              stroke="#94A3B8"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

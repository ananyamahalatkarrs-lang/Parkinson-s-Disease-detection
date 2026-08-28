import React from 'react';
import { Cpu, ShieldAlert, CheckCircle2, Sparkles, BarChart2 } from 'lucide-react';

export const ModelExplanationView = ({ patient }) => {
  const contributingFeatures = [
    { name: 'Spiral Tremor Amplitude & Latency', contribution: 28, category: 'Motor Kinematics', status: 'Elevated Variance' },
    { name: 'Acoustic Formant Spectral Shift (F1/F2)', contribution: 24, category: 'Voice Phonations', status: 'Moderate Shift' },
    { name: 'Rapid Alternating Tap Frequency Delta', contribution: 18, category: 'Motor Kinematics', status: 'Nominal' },
    { name: 'Autonomic & Non-Motor Sleep Variance', contribution: 14, category: 'Wellbeing Telemetry', status: 'Within Threshold' },
    { name: 'Postural Gait Cadence Asymmetry', contribution: 16, category: 'Gait Accelerometry', status: 'Moderate Shift' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card-base" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              color: 'var(--cyan)',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <Cpu size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }} className="font-mono">
                MODEL EXPLANATION & EXPLAINABILITY
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Feature contribution breakdown & variational Hilbert-space feature weights
              </p>
            </div>
          </div>

          <span className="badge badge-cyan font-mono">
            EXPLAINABILITY ENGINE v2.1
          </span>
        </div>

        {/* Model Metrics Bar */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-very-light-blue)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MODEL CONFIDENCE SCORE</div>
            <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-blue)', marginTop: '0.2rem' }}>
              88.4% Confidence
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PRIMARY CONTRIBUTING MODALITY</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Motor Kinematics (46% Total)
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>QML CLASSIFIER TYPE</div>
            <div className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--cyan)', marginTop: '0.2rem' }}>
              8-Qubit Variational Circuit
            </div>
          </div>
        </div>
      </div>

      {/* Feature Importance Contribution Visualization */}
      <div className="card-base" style={{ padding: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
          Important Contributing Features
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {contributingFeatures.map((feat, idx) => (
            <div key={idx} style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                    {feat.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.65rem' }}>
                    ({feat.category})
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                  {feat.contribution}% Weight
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{
                height: '8px',
                width: '100%',
                backgroundColor: '#E2E8F0',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '0.35rem'
              }}>
                <div style={{
                  height: '100%',
                  width: `${feat.contribution * 3}%`,
                  maxWidth: '100%',
                  backgroundColor: 'var(--primary-blue)',
                  borderRadius: '4px'
                }} />
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Feature Trajectory Status: <strong style={{ color: feat.status.includes('Elevated') ? 'var(--danger)' : 'var(--text-primary)' }}>{feat.status}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Textual Model Explanation & Decision Support Notice */}
      <div style={{
        padding: '1rem 1.25rem',
        backgroundColor: 'var(--bg-very-light-blue)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        fontSize: '0.825rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem'
      }}>
        <ShieldAlert size={20} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
        <div>
          <strong>Model Output Explanation Summary:</strong> The primary model vector shift is driven by spiral tremor frequency variance (+0.28 delta) and acoustic formant shift. Model outputs provide quantitative feature weights as decision-support telemetry only and do not provide a clinical diagnosis.
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Cpu, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

export const AIAssessmentCard = ({ observations }) => {
  return (
    <div className="card-base" style={{
      padding: '1.5rem',
      backgroundColor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            color: 'var(--cyan)',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }} className="font-mono">
              AI-ASSISTED ASSESSMENT INSIGHTS
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Non-diagnostic clinical decision support telemetry
            </span>
          </div>
        </div>

        <span className="badge badge-cyan font-mono">
          MODEL OUTPUT
        </span>
      </div>

      {/* Observations List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
        {observations?.map((obs) => (
          <div key={obs.id} style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-very-light-blue)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                {obs.title}
              </span>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {obs.date}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
              {obs.observation}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>Target: <strong style={{ color: 'var(--text-primary)' }}>{obs.patient}</strong></span>
              <span className="font-mono" style={{ color: 'var(--primary-blue)' }}>{obs.model}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Decision Support Disclaimer */}
      <div style={{
        padding: '0.85rem 1rem',
        backgroundColor: 'var(--bg-main)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)',
        fontSize: '0.775rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.65rem'
      }}>
        <ShieldAlert size={16} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
        <div>
          <strong>Clinical Decision Support Disclaimer:</strong> These insights are generated as decision-support information and should be interpreted by qualified healthcare professionals.
        </div>
      </div>
    </div>
  );
};

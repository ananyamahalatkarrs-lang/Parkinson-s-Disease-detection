import React, { useState, useEffect } from 'react';
import { clinicianService } from '../services/clinicianService';
import { LoadingState } from '../../../components/common/LoadingState';
import { ErrorState } from '../../../components/common/ErrorState';
import { Badge } from '../../../components/common/Badge';
import { ClipboardList, Activity, Mic, HeartPulse, Cpu, TrendingUp, ShieldCheck } from 'lucide-react';

export const AssessmentReview = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      setLoading(true);
      try {
        const res = await clinicianService.getAssessments();
        setAssessments(res);
      } catch (err) {
        setError('Failed to fetch structured assessment telemetry.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  if (loading) return <LoadingState message="Loading multi-modal assessment telemetry..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          ASSESSMENT REVIEW
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Structured multi-modal observation telemetry for Motor, Voice, and Non-Motor risk indicators.
        </p>
      </div>

      {/* Medical Safety Banner */}
      <div style={{
        padding: '0.85rem 1.25rem',
        backgroundColor: 'var(--bg-very-light-blue)',
        border: '1px solid rgba(37, 99, 235, 0.25)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.5rem',
        fontSize: '0.825rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <ShieldCheck size={20} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Non-Diagnostic Telemetry Notice:</strong> Risk level categories (<strong style={{ color: 'var(--success)' }}>Low</strong>, <strong style={{ color: 'var(--warning)' }}>Moderate</strong>, <strong style={{ color: 'var(--danger)' }}>Elevated</strong>) represent model feature indicators only. Clinical diagnosis remains under attending physician oversight.
        </div>
      </div>

      {/* Structured Assessment Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {assessments.map((asm) => (
          <div key={asm.id} className="card-base" style={{ padding: '1.5rem' }}>
            {/* 1. Assessment Summary Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--border)',
              marginBottom: '1.25rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--deep-blue)' }}>
                    {asm.id}
                  </span>
                  <Badge variant="info">{asm.type}</Badge>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Patient: <strong style={{ color: 'var(--text-primary)' }}>{asm.patientName}</strong> ({asm.patientId}) | Date: <span className="font-mono">{asm.date}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-cyan font-mono" style={{ marginBottom: '0.25rem', display: 'inline-flex' }}>
                  ASSESSMENT RESULT: {asm.result}
                </span>
                <div>
                  <Badge variant={asm.risk === 'Elevated' ? 'danger' : asm.risk === 'Moderate' ? 'warning' : 'success'}>
                    Risk Indicator: {asm.risk}
                  </Badge>
                </div>
              </div>
            </div>

            {/* 2, 3, 4. Motor, Voice, Non-Motor Observations Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              {/* Motor */}
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '0.35rem' }}>
                  <Activity size={16} /> Motor Kinematics
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Spiral tremor amplitude and rapid tapping latency evaluated during task execution battery.
                </p>
              </div>

              {/* Voice */}
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.35rem' }}>
                  <Mic size={16} /> Voice Acoustic Formants
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Sustained phonation jitter/shimmer ratio and harmonic spectrum variance telemetry.
                </p>
              </div>

              {/* Wellbeing */}
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--violet)', marginBottom: '0.35rem' }}>
                  <HeartPulse size={16} /> Wellbeing / Non-Motor
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Autonomic score and longitudinal sleep variance metrics captured via daily check-in.
                </p>
              </div>
            </div>

            {/* 5 & 6. Model Output & Longitudinal Trend Bar */}
            <div style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--bg-very-light-blue)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={16} color="var(--primary-blue)" />
                <span className="font-mono" style={{ color: 'var(--text-muted)' }}>MODEL OUTPUT TELEMETRY:</span>
                <span className="font-mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{asm.modelOutput}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={16} color="var(--cyan)" />
                <span style={{ color: 'var(--text-muted)' }}>Longitudinal Shift:</span>
                <strong style={{ color: 'var(--primary-blue)' }}>Score {asm.trendScore} / 100</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

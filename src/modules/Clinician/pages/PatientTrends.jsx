import React, { useState } from 'react';
import { useClinicianData } from '../hooks/useClinicianData';
import { LongitudinalChart } from '../components/LongitudinalChart';
import { LoadingState } from '../../../components/common/LoadingState';
import { ErrorState } from '../../../components/common/ErrorState';
import { TrendingUp, Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export const PatientTrends = () => {
  const { overview, loading, error, refetch } = useClinicianData();
  const [selectedCohort, setSelectedCohort] = useState('ALL');

  if (loading) return <LoadingState message="Loading longitudinal trends telemetry..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          LONGITUDINAL PATIENT TRENDS
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Observe feature vector trajectories and score shifts across multiple assessment dates.
        </p>
      </div>

      {/* Main Longitudinal Trend Chart */}
      <div style={{ marginBottom: '1.75rem' }}>
        <LongitudinalChart data={overview.longitudinalTrendData} />
      </div>

      {/* Timeline of Observed Changes */}
      <div className="card-base">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Longitudinal Assessment Timeline
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              Chronological changes across assessment intervals
            </p>
          </div>
          <span className="badge badge-info font-mono">MULTI-DATE COMPARISON</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-light-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)'
              }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                  Aug 26, 2026 Assessment Interval
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Patient A (PT-1024) — Motor & Vocal Telemetry Shift +0.28 vs July Baseline
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-success">Stable Trend</span>
              <ArrowRight size={16} color="var(--text-muted)" />
            </div>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--cyan)'
              }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                  Aug 25, 2026 Assessment Interval
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Patient B (PT-1025) — Acoustic Formant Shift +0.42 observed across 3 consecutive trials
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-danger">Feature Variance</span>
              <ArrowRight size={16} color="var(--text-muted)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

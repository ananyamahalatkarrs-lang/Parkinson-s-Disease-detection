import React, { useState } from 'react';
import { useClinicianData } from '../hooks/useClinicianData';
import { usePatients } from '../hooks/usePatients';
import { MetricCard } from '../components/MetricCard';
import { PatientTable } from '../components/PatientTable';
import { LongitudinalChart } from '../components/LongitudinalChart';
import { RiskDistributionChart } from '../components/RiskDistributionChart';
import { AIAssessmentCard } from '../components/AIAssessmentCard';
import { FollowUpCard } from '../components/FollowUpCard';
import { FollowUpModal } from '../components/FollowUpModal';
import { LoadingState } from '../../../components/common/LoadingState';
import { ErrorState } from '../../../components/common/ErrorState';
import { Users, Activity, CalendarCheck, ClipboardList, Calendar } from 'lucide-react';

export const DoctorDashboard = () => {
  const { overview, loading, error, refetch } = useClinicianData();
  const { patients } = usePatients();

  const [dateRange, setDateRange] = useState('Aug 2026');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  if (loading) return <LoadingState message="Connecting to clinical decision support telemetry..." />;
  if (error || !overview) return <ErrorState message={error || 'Failed to load clinician dashboard'} onRetry={refetch} />;

  return (
    <div>
      {/* Main Page Heading */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.2
          }}>
            Good Morning, Dr. Aris Thorne
          </h1>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginTop: '0.35rem'
          }}>
            Here's an overview of your patient monitoring and assessment activity.
          </p>
        </div>

        {/* Date / Period Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: '#FFFFFF',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0',
          fontSize: '0.825rem',
          color: 'var(--text-secondary)'
        }}>
          <Calendar size={15} color="var(--primary-blue)" />
          <span style={{ fontWeight: 600 }}>Period:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="select-field font-mono"
            style={{
              padding: '0.2rem 0.4rem',
              height: '28px',
              fontSize: '0.8rem',
              border: 'none',
              backgroundColor: 'transparent'
            }}
          >
            <option value="Aug 2026">Aug 2026 (Current)</option>
            <option value="Jul 2026">Jul 2026</option>
            <option value="Jun 2026">Jun 2026</option>
          </select>
        </div>
      </div>

      {/* SECTION 1: CLINICAL OVERVIEW METRIC CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <MetricCard
          title="Total Patients"
          value={overview.totalPatients}
          subtitle="Enrolled cohort"
          icon={Users}
          badge={{ text: 'CLINICAL COHORT', variant: 'info' }}
        />
        <MetricCard
          title="Assessments This Week"
          value={overview.assessmentsThisWeek}
          subtitle="Evaluations completed"
          icon={Activity}
          badge={{ text: 'ACTIVE', variant: 'success' }}
        />
        <MetricCard
          title="Patients Requiring Review"
          value={overview.followUpsDue}
          subtitle="Review & action due"
          icon={CalendarCheck}
          badge={{ text: 'ACTION REQUIRED', variant: 'danger' }}
        />
        <MetricCard
          title="New Assessments"
          value={overview.newAssessments}
          subtitle="Submitted past 24h"
          icon={ClipboardList}
          badge={{ text: 'NEW TELEMETRY', variant: 'cyan', isMono: true }}
        />
      </div>

      {/* SECTION 2: PATIENT OVERVIEW TABLE */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Recent Patients
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Longitudinal tracking and clinical status review
            </p>
          </div>
        </div>

        <PatientTable patients={patients.slice(0, 5)} />
      </div>

      {/* SECTION 3: LONGITUDINAL TRENDS & RISK DISTRIBUTION GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '1.5rem',
        marginBottom: '1.75rem',
        alignItems: 'start'
      }}>
        {/* Longitudinal Chart */}
        <LongitudinalChart data={overview.longitudinalTrendData} />

        {/* Risk Distribution Breakdown */}
        <RiskDistributionChart />
      </div>

      {/* SECTION 4 & 5: UPCOMING FOLLOW-UPS & AI-ASSISTED INSIGHTS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        marginBottom: '1.75rem',
        alignItems: 'start'
      }}>
        {/* Upcoming Follow-ups */}
        <FollowUpCard
          followUps={patients.map(p => ({
            patientId: p.id,
            patientName: p.name,
            followUpDate: p.nextFollowUp,
            latestAssessmentDate: p.latestAssessmentDate,
            status: p.followUpStatus
          }))}
          onScheduleClick={() => setScheduleModalOpen(true)}
        />

        {/* AI-Assisted Assessment Insights */}
        <AIAssessmentCard observations={overview.aiObservations} />
      </div>

      {/* Follow-up Schedule Modal */}
      <FollowUpModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        patients={patients}
        onSchedule={async (pid, date, notes) => {
          await refetch();
        }}
      />
    </div>
  );
};

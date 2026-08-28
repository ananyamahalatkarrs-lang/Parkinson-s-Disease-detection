import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { clinicianService } from '../services/clinicianService';
import { LoadingState } from '../../../components/common/LoadingState';
import { ErrorState } from '../../../components/common/ErrorState';
import { Badge } from '../../../components/common/Badge';
import { ReportModal } from '../components/ReportModal';
import { ModelExplanationView } from '../components/ModelExplanationView';
import { CompareAssessmentsView } from '../components/CompareAssessmentsView';
import { ClinicalNotesView } from '../components/ClinicalNotesView';
import { ArrowLeft, User, Calendar, Activity, TrendingUp, FileText, CheckCircle2, Cpu, ArrowRightLeft, MessageSquare } from 'lucide-react';

export const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const res = await clinicianService.getPatientById(id || 'PT-1024');
        setPatient(res);
      } catch (err) {
        setError('Failed to fetch patient record.');
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  if (loading) return <LoadingState message="Loading detailed patient clinical record..." />;
  if (error || !patient) return <ErrorState message={error || 'Patient record not found'} />;

  const tabs = [
    { id: 'OVERVIEW', label: 'OVERVIEW' },
    { id: 'ASSESSMENTS', label: 'ASSESSMENTS' },
    { id: 'TRENDS', label: 'TRENDS' },
    { id: 'MODEL EXPLANATION', label: 'MODEL EXPLANATION' },
    { id: 'COMPARE ASSESSMENTS', label: 'COMPARE ASSESSMENTS' },
    { id: 'NOTES', label: 'CLINICAL NOTES' },
    { id: 'REPORTS', label: 'REPORTS' }
  ];

  return (
    <div>
      {/* Header Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/clinician/patients" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem', fontWeight: 600 }}>
          <ArrowLeft size={14} /> Back to Patient Directory
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {patient.name}
              </h1>
              <span className="badge badge-info font-mono" style={{ fontSize: '0.85rem' }}>
                {patient.id}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'flex', gap: '1.25rem' }}>
              <span>Age Group: <strong style={{ color: 'var(--text-primary)' }}>{patient.ageGroup}</strong></span>
              <span>Last Assessment: <strong className="font-mono" style={{ color: 'var(--primary-blue)' }}>{patient.latestAssessmentDate}</strong></span>
            </div>
          </div>

          <button onClick={() => setReportModalOpen(true)} className="btn btn-primary btn-sm">
            <FileText size={14} /> Generate Clinical Report
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.65rem 1rem',
              fontSize: '0.825rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? 'var(--primary-blue)' : 'var(--text-secondary)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--primary-blue)' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* Patient Bio Summary */}
          <div className="card-base">
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Patient Profile Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Clinician:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>{patient.assignedClinician}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Observed Longitudinal Trend:</span>
                <div style={{ marginTop: '0.2rem' }}>
                  <Badge variant={patient.observedTrend === 'Stable' ? 'success' : 'danger'}>
                    {patient.observedTrend}
                  </Badge>
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Next Follow-up Appointment:</span>
                <div className="font-mono" style={{ fontWeight: 700, color: 'var(--primary-blue)', marginTop: '0.15rem' }}>
                  {patient.nextFollowUp} ({patient.followUpStatus})
                </div>
              </div>
            </div>
          </div>

          {/* Assessment History */}
          <div className="card-base">
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Recent Assessment Telemetry
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {patient.assessmentHistory?.map((asm) => (
                <div key={asm.id} style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--bg-very-light-blue)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span className="font-mono" style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>{asm.id} ({asm.type})</span>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{asm.date}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    Result Indicator: {asm.result}
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    Model Telemetry: {asm.modelOutput}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ASSESSMENTS TAB */}
      {activeTab === 'ASSESSMENTS' && (
        <div className="card-base">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Structured Multi-Modal Assessments
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Complete evaluation record for Motor Kinematics, Acoustic Phonations, and Wellbeing surveys.
          </p>
          <div className="badge badge-info font-mono">NON-DIAGNOSTIC TELEMETRY RECORD</div>
        </div>
      )}

      {/* TRENDS TAB */}
      {activeTab === 'TRENDS' && (
        <div className="card-base">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Longitudinal Trend Comparison
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Comparing multi-modal feature vector changes from baseline to current date.
          </p>
        </div>
      )}

      {/* MODEL EXPLANATION TAB */}
      {activeTab === 'MODEL EXPLANATION' && (
        <ModelExplanationView patient={patient} />
      )}

      {/* COMPARE ASSESSMENTS TAB */}
      {activeTab === 'COMPARE ASSESSMENTS' && (
        <CompareAssessmentsView patient={patient} />
      )}

      {/* CLINICAL NOTES TAB */}
      {activeTab === 'NOTES' && (
        <ClinicalNotesView patient={patient} />
      )}

      {/* REPORTS TAB */}
      {activeTab === 'REPORTS' && (
        <div className="card-base">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Clinical Reports Catalog
          </h3>
          <button onClick={() => setReportModalOpen(true)} className="btn btn-primary btn-sm">
            Generate New Report
          </button>
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        patient={patient}
      />
    </div>
  );
};

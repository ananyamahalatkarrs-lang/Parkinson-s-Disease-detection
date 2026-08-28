import React, { useState } from 'react';
import { usePatients } from '../hooks/usePatients';
import { ReportModal } from '../components/ReportModal';
import { FileText, Download, Printer, Plus, CheckCircle2 } from 'lucide-react';

export const ReportsPage = () => {
  const { patients } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState(patients[0] || null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            CLINICAL REPORTS & SUMMARIES
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Structured PDF reports and longitudinal assessment summaries.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Generate Structured Report
        </button>
      </div>

      {/* Reports Catalog */}
      <div className="card-base">
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
          Available Patient Summaries
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {patients.map((p) => (
            <div key={p.id} style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {p.name} ({p.id}) — Longitudinal Summary Report
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.2rem' }} className="font-mono">
                  Compiled Date: {p.latestAssessmentDate} | Trend: {p.observedTrend}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button
                  onClick={() => { setSelectedPatient(p); setModalOpen(true); }}
                  className="btn btn-secondary btn-sm"
                >
                  <FileText size={14} /> Preview Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        patient={selectedPatient || patients[0]}
      />
    </div>
  );
};

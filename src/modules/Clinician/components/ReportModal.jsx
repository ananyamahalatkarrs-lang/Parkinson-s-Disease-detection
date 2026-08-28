import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export const ReportModal = ({ isOpen, onClose, patient }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { setGenerated(false); onClose(); }}
      title="Generate Structured Clinical Report"
      subtitle={`Export longitudinal assessment summary for ${patient?.name || 'Patient'}`}
      maxWidth="620px"
      cancelText="Close"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-very-light-blue)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          fontSize: '0.85rem'
        }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            Report Specifications:
          </div>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <li>Patient Record: <strong>{patient?.name}</strong> ({patient?.id})</li>
            <li>Assessment Window: <strong>May 2026 – Aug 2026</strong></li>
            <li>Telemetry: <strong>Motor Kinematics, Acoustic Formants, Non-Motor Wellbeing</strong></li>
            <li>Classification Status: <strong>Non-Diagnostic Decision Support Export</strong></li>
          </ul>
        </div>

        {generated ? (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--success)',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <CheckCircle2 size={18} /> Report PDF compiled successfully.
            </span>
            <button className="btn btn-primary btn-sm">
              <Download size={14} /> Download PDF
            </button>
          </div>
        ) : (
          <button
            onClick={handleGenerate}
            className="btn btn-primary"
            disabled={isGenerating}
            style={{ width: '100%', padding: '0.75rem' }}
          >
            {isGenerating ? 'Compiling Longitudinal Summary...' : (
              <>
                <FileText size={16} /> Generate Structured Report
              </>
            )}
          </button>
        )}
      </div>
    </Modal>
  );
};

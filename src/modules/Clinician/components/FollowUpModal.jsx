import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';

export const FollowUpModal = ({ isOpen, onClose, patients, onSchedule }) => {
  const [patientId, setPatientId] = useState(patients[0]?.id || 'PT-1024');
  const [date, setDate] = useState('2026-09-05');
  const [notes, setNotes] = useState('Routine longitudinal motor assessment & tremor check.');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSchedule(patientId, date, notes);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Patient Follow-up"
      subtitle="Select a patient and set a follow-up appointment date for longitudinal review."
      confirmText="Schedule Follow-up"
      onConfirm={handleSubmit}
      isLoading={isLoading}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
            Select Patient
          </label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="select-field"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
            Follow-up Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field font-mono"
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
            Clinical Follow-up Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field"
          />
        </div>
      </div>
    </Modal>
  );
};

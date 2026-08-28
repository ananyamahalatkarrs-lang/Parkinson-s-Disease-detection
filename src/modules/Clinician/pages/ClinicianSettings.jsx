import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { User, Bell, Shield, Save, CheckCircle2 } from 'lucide-react';

export const ClinicianSettings = () => {
  const { currentUser } = useAuth();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Dr. Aris Thorne',
    email: 'clinician@qparkinson.org',
    specialization: 'Neurology & Movement Disorders',
    hospital: 'Metropolitan Neurological Medical Center',
    licenseNumber: 'MD-90821-NY',
    notifyNewAssessments: true,
    notifyTrendChanges: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          CLINICIAN PROFILE & SETTINGS
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Manage your medical credentials, clinical preferences, and notifications.
        </p>
      </div>

      <div className="card-base">
        {saved && (
          <div style={{
            padding: '0.85rem 1rem',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--success)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={18} /> Settings updated successfully.
          </div>
        )}

        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                Full Name & Title
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  Medical Specialization
                </label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                  License / Registration ID
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="input-field font-mono"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                Hospital / Organization
              </label>
              <input
                type="text"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                className="input-field"
              />
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Clinical Notifications
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.notifyNewAssessments}
                    onChange={(e) => setFormData({ ...formData, notifyNewAssessments: e.target.checked })}
                    style={{ accentColor: 'var(--primary-blue)' }}
                  />
                  Notify when a patient submits a new multi-modal assessment
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.notifyTrendChanges}
                    onChange={(e) => setFormData({ ...formData, notifyTrendChanges: e.target.checked })}
                    style={{ accentColor: 'var(--primary-blue)' }}
                  />
                  Alert on significant longitudinal feature trajectory shifts
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.75rem' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

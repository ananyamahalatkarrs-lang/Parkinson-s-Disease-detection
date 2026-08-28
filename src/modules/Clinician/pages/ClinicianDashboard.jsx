import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Stethoscope, LogOut, ShieldCheck, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClinicianDashboard = () => {
  const { currentUser, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', padding: '2.5rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan)'
            }}>
              <Stethoscope size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Q-PARKINSON CLINICIAN WORKSPACE
              </h1>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }} className="font-mono">
                MEDICAL PRACTICE & RISK MONITORING
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => switchRole('Researcher')} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Switch Demo Role
            </button>
            <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-secondary btn-sm" style={{ color: 'var(--danger)' }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        <div className="card-base" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Welcome, {currentUser?.name}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Clinical risk stratification, motor biomarker analytics, and patient monitoring.
              </p>
            </div>
            <span className="badge badge-cyan font-mono">ROLE: CLINICIAN</span>
          </div>

          <div style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-very-light-blue)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CLINICIAN EMAIL</div>
              <div className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {currentUser?.email}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SPECIALIZATION</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-blue)', marginTop: '0.2rem' }}>
                Neurology & Movement Disorders
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VERIFICATION STATUS</div>
              <div style={{ marginTop: '0.2rem' }}>
                <span className="badge badge-success">● VERIFIED PRACTICE</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          padding: '1rem 1.25rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <ShieldCheck size={20} color="var(--primary-blue)" />
          <div>
            <strong>Clinician Authentication Successful:</strong> Professional clinical license authorization verified.
          </div>
        </div>
      </div>
    </div>
  );
};

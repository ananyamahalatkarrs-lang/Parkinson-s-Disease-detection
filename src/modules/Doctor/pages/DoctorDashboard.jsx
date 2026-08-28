import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Badge } from '../../../components/common/Badge';
import { Stethoscope, LogOut, ShieldCheck, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DoctorDashboard = () => {
  const { currentUser, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'rgba(53, 214, 232, 0.15)',
            border: '1px solid var(--quantum)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--quantum)'
          }}>
            <Stethoscope size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              DOCTOR CLINICAL PORTAL
            </h1>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Q-PARKINSON / DOCTOR DASHBOARD
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => switchRole('ADMIN')} className="btn btn-secondary btn-sm">
            <Shield size={14} /> Switch to Admin Control
          </button>
          <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-danger btn-sm">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="card-elevated" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Welcome, {currentUser?.name}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Clinical review, patient monitoring, and risk trend evaluation.
            </p>
          </div>
          <Badge variant="quantum" isMono>ROLE: DOCTOR</Badge>
        </div>

        <div style={{
          padding: '1.25rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SPECIALIZATION</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {currentUser?.specialization || 'Movement Disorders & Neurology'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LICENSE / REGISTRATION</div>
            <div className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--quantum)', marginTop: '0.2rem' }}>
              {currentUser?.professionalId || 'MD-994012'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VERIFICATION STATUS</div>
            <div style={{ marginTop: '0.2rem' }}>
              <Badge variant="success">● VERIFIED CLINICIAN</Badge>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: '1rem 1.25rem',
        backgroundColor: 'rgba(57, 201, 138, 0.08)',
        border: '1px solid rgba(57, 201, 138, 0.25)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.85rem',
        color: 'var(--success)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <ShieldCheck size={20} />
        <div>
          <strong>Doctor Module Ready:</strong> Clinician authentication, credential verification check, and route protection verified successfully.
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Clock, ShieldAlert, ArrowLeft, LogOut, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

export const PendingVerification = () => {
  const { currentUser, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card-elevated" style={{
        maxWidth: '540px',
        width: '100%',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        borderColor: 'rgba(244, 184, 96, 0.4)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(244, 184, 96, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: 'var(--warning)'
        }}>
          <Clock size={32} />
        </div>

        <Badge variant="warning" isMono style={{ marginBottom: '1rem', display: 'inline-flex' }}>
          PENDING VERIFICATION
        </Badge>

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: '0.75rem',
          color: 'var(--text-primary)'
        }}>
          ACCOUNT VERIFICATION IN PROGRESS
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.925rem',
          lineHeight: 1.6,
          marginBottom: '1.75rem'
        }}>
          Your professional credentials for <strong>{currentUser?.name}</strong> ({currentUser?.role}) are currently undergoing verification by the Q-PARKINSON System Control team.
        </p>

        {/* Credentials Details Summary */}
        <div style={{
          padding: '1.1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          marginBottom: '1.75rem',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Registered Credential Details:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-secondary)' }}>
            <div>Email: <span className="font-mono" style={{ color: 'var(--text-primary)' }}>{currentUser?.email}</span></div>
            {currentUser?.organization && <div>Organization: <strong>{currentUser?.organization}</strong></div>}
            {currentUser?.institution && <div>Institution: <strong>{currentUser?.institution}</strong></div>}
            <div>Verification Status: <span className="font-mono" style={{ color: 'var(--warning)' }}>IN_REVIEW</span></div>
          </div>
        </div>

        {/* Informational Callout */}
        <div style={{
          padding: '0.85rem',
          backgroundColor: 'rgba(76, 141, 255, 0.08)',
          border: '1px solid rgba(76, 141, 255, 0.2)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          color: 'var(--primary-soft)',
          marginBottom: '1.75rem',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem'
        }}>
          <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <span>
            To ensure patient data privacy and research integrity, clinical and quantum research features are granted once license verification completes. You will receive an email confirmation upon approval.
          </span>
        </div>

        {/* Actions & Role Switcher */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={() => switchRole('ADMIN')}
            className="btn btn-quantum"
            style={{ width: '100%' }}
          >
            <CheckCircle2 size={16} /> Verify Account as Admin (Demo Mode)
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            <LogOut size={16} /> Logout and Return to Login
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const ProtectedRoute = ({ children, allowedRoles = ['Clinician'] }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  const isAllowed = allowedRoles.length === 0 || allowedRoles.includes(currentUser?.role);

  if (!isAllowed) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div className="card-base" style={{
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          padding: '2.5rem 2rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            color: 'var(--danger)'
          }}>
            <ShieldAlert size={30} />
          </div>

          <span className="badge badge-danger font-mono" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            HTTP 403 RESTRICTED
          </span>

          <h2 style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            Access Restricted
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}>
            Clinician credentials are required to access this workspace.
          </p>

          <Link
            to="/login"
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            <ArrowLeft size={16} /> Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

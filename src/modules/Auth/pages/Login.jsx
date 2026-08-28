import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { InputField } from '../components/InputField';
import { PasswordInput } from '../components/PasswordInput';
import { AuthError } from '../components/AuthError';
import { validateEmail } from '../utils/validation';
import { LogIn, Mail, CheckCircle2, User, Stethoscope, Atom, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('clinician@qparkinson.org');
  const [password, setPassword] = useState('Password123!');
  const [rememberMe, setRememberMe] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const successMessage = location.state?.message || '';

  const demoAccounts = [
    { role: 'Patient', email: 'patient@qparkinson.org', icon: User, color: '#2563EB' },
    { role: 'Doctor', email: 'clinician@qparkinson.org', icon: Stethoscope, color: '#0EA5E9' },
    { role: 'Researcher', email: 'researcher@qparkinson.org', icon: Atom, color: '#7C3AED' },
    { role: 'Admin', email: 'admin@qparkinson.org', icon: ShieldCheck, color: '#10B981' }
  ];

  const handleDemoSelect = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Password123!');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const emailErr = validateEmail(email);
    if (emailErr) {
      setErrorMsg(emailErr);
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const user = await loginUser(email, password);
      const role = (user?.role || '').toLowerCase();

      if (role.includes('patient')) {
        navigate('/patient/dashboard', { replace: true });
      } else if (role.includes('doctor') || role.includes('clinician')) {
        navigate('/clinician/dashboard', { replace: true });
      } else if (role.includes('researcher')) {
        navigate('/researcher/dashboard', { replace: true });
      } else if (role.includes('admin')) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/clinician/dashboard', { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        subtitle="Access your Q-PARKINSON workspace"
      >
        {successMessage && (
          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--success)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        <AuthError message={errorMsg} />

        {/* Quick Demo Account Selector */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', marginBottom: '0.5rem' }} className="font-mono">
            QUICK ROLE DEMO PRESETS:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
            {demoAccounts.map(acc => {
              const Icon = acc.icon;
              const isSelected = email.toLowerCase() === acc.email.toLowerCase();
              return (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleDemoSelect(acc.email)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.2rem',
                    padding: '0.5rem 0.25rem',
                    borderRadius: '8px',
                    border: `1px solid ${isSelected ? acc.color : '#E2E8F0'}`,
                    backgroundColor: isSelected ? `${acc.color}10` : '#F8FAFC',
                    color: isSelected ? acc.color : '#475569',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={16} />
                  <span>{acc.role}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            icon={Mail}
            required
            autoComplete="username"
          />

          <PasswordInput
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {/* Remember me & Forgot Password */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            fontSize: '0.825rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--primary-blue)' }}
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              style={{
                color: 'var(--primary-blue)',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem' }}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? 'Signing In...' : (
              <>
                <LogIn size={16} /> Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: 'var(--primary-blue)',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Sign up
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

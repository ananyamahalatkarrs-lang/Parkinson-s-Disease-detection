import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { InputField } from '../components/InputField';
import { PasswordInput } from '../components/PasswordInput';
import { AuthError } from '../components/AuthError';
import { validateEmail } from '../utils/validation';
import { LogIn, Mail } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('clinician@qparkinson.org');
  const [password, setPassword] = useState('Password123!');
  const [rememberMe, setRememberMe] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      await loginUser(email, password);
      navigate('/clinician/dashboard');
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
        <AuthError message={errorMsg} />

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

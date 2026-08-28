import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { PasswordInput } from '../components/PasswordInput';
import { PasswordStrength } from '../components/PasswordStrength';
import { AuthError } from '../components/AuthError';
import { AuthSuccess } from '../components/AuthSuccess';
import { validatePassword } from '../utils/validation';
import { Save, ArrowLeft } from 'lucide-react';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const passErr = validatePassword(password);
    if (passErr) {
      setErrorMsg(passErr);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.resetPassword('sample_token', password);
      setSuccessMsg(res.message);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Update your password"
        subtitle="Create a new secure password for your account."
      >
        <AuthError message={errorMsg} />
        <AuthSuccess message={successMsg} />

        <form onSubmit={handleSubmit}>
          <PasswordInput
            label="New Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordStrength password={password} />

          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
            disabled={isLoading || !password || password !== confirmPassword}
          >
            {isLoading ? 'Updating...' : (
              <>
                <Save size={16} /> Update Password
              </>
            )}
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem'
        }}>
          <Link
            to="/login"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Return to Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

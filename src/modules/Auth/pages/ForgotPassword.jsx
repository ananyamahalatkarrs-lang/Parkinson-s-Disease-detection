import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { InputField } from '../components/InputField';
import { AuthError } from '../components/AuthError';
import { AuthSuccess } from '../components/AuthSuccess';
import { validateEmail } from '../utils/validation';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const emailErr = validateEmail(email);
    if (emailErr) {
      setErrorMsg(emailErr);
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      setSuccessMsg(res.message);
      setEmail('');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Reset your password"
        subtitle="Enter the email address associated with your Q-PARKINSON account."
      >
        <AuthError message={errorMsg} />
        <AuthSuccess message={successMsg} />

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            icon={Mail}
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
            disabled={isLoading || !email}
          >
            {isLoading ? 'Sending Link...' : (
              <>
                <Send size={16} /> Send Reset Link
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

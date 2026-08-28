import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { RoleSelector } from '../components/RoleSelector';
import { InputField } from '../components/InputField';
import { PasswordInput } from '../components/PasswordInput';
import { PasswordStrength } from '../components/PasswordStrength';
import { AuthError } from '../components/AuthError';
import { validateEmail, validatePassword } from '../utils/validation';
import { UserPlus } from 'lucide-react';

export const Signup = () => {
  const navigate = useNavigate();
  const { signupUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMsg('');
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword &&
    formData.termsAgreed;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Full name is required.');
      return;
    }

    const emailErr = validateEmail(formData.email);
    if (emailErr) {
      setErrorMsg(emailErr);
      return;
    }

    const passErr = validatePassword(formData.password);
    if (passErr) {
      setErrorMsg(passErr);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!formData.termsAgreed) {
      setErrorMsg('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    try {
      await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'Clinician'
      });

      navigate('/clinician/dashboard');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout isSignup>
      <AuthCard
        title="Create your account"
        subtitle="Join the Q-PARKINSON research and intelligence platform."
      >
        <RoleSelector label="Account Role" />

        <AuthError message={errorMsg} />

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Dr. Eleanor Vance"
            required
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
            autoComplete="username"
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <PasswordStrength password={formData.password} />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          {/* Terms Checkbox */}
          <div style={{ marginBottom: '1.25rem', fontSize: '0.8rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              lineHeight: 1.4
            }}>
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                style={{ marginTop: '0.15rem', accentColor: 'var(--primary-blue)' }}
                required
              />
              <span>
                I agree to the <span style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Privacy Policy</span>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem' }}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Creating Account...' : (
              <>
                <UserPlus size={16} /> Create Account
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
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: 'var(--primary-blue)',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

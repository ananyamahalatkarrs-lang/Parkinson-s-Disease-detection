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
import { UserPlus, Building, Award, ShieldCheck } from 'lucide-react';

export const Signup = () => {
  const navigate = useNavigate();
  const { signupUser } = useAuth();

  const [selectedRole, setSelectedRole] = useState('Patient');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    institution: '',
    adminKey: '',
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
        role: selectedRole,
        licenseNumber: formData.licenseNumber,
        institution: formData.institution
      });

      navigate('/login', { state: { message: `Account created successfully as ${selectedRole}! Please sign in.` } });
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
        <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} label="SELECT YOUR ROLE" />

        <AuthError message={errorMsg} />

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={selectedRole === 'Clinician' ? 'e.g. Dr. Eleanor Vance' : 'e.g. Alex Morgan'}
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

          {selectedRole === 'Clinician' && (
            <InputField
              label="Medical License / NPI Identifier"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="e.g. NPI-890214-NEURO"
              icon={Award}
            />
          )}

          {selectedRole === 'Researcher' && (
            <InputField
              label="Institution / Organization"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g. Quantum Neurosciences Lab / MIT"
              icon={Building}
            />
          )}

          {selectedRole === 'Admin' && (
            <InputField
              label="Admin Access Authorization Key"
              name="adminKey"
              value={formData.adminKey}
              onChange={handleChange}
              placeholder="e.g. ADM-QPARK-2026-KEY"
              icon={ShieldCheck}
            />
          )}

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
                I agree to the <Link to="/privacy" style={{ color: 'var(--primary-blue)' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: 'var(--primary-blue)' }}>Privacy Policy</Link>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem' }}
            disabled={isLoading}
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
            Sign in
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

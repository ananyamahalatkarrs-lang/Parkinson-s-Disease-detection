import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const PasswordInput = ({
  label = 'Password',
  name = 'password',
  value,
  onChange,
  placeholder = '••••••••',
  error,
  required = false,
  autoComplete = 'current-password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ marginBottom: '1.1rem' }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.35rem'
          }}
        >
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          left: '0.85rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Lock size={16} />
        </div>

        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className="input-field font-mono"
          style={{
            paddingLeft: '2.4rem',
            paddingRight: '2.4rem',
            borderColor: error ? 'var(--danger)' : 'var(--border)'
          }}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && (
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--danger)',
          marginTop: '0.3rem',
          display: 'block'
        }}>
          {error}
        </span>
      )}
    </div>
  );
};

import React from 'react';

export const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  isMono = false,
  icon: Icon,
  autoComplete
}) => {
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
        {Icon && (
          <div style={{
            position: 'absolute',
            left: '0.85rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Icon size={16} />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`input-field ${isMono ? 'font-mono' : ''}`}
          style={{
            paddingLeft: Icon ? '2.4rem' : '0.85rem',
            borderColor: error ? 'var(--danger)' : 'var(--border)'
          }}
        />
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

import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'primary', // 'primary', 'danger', 'quantum'
  isLoading = false,
  maxWidth = '520px'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getConfirmBtnClass = () => {
    if (variant === 'danger') return 'btn-danger';
    if (variant === 'quantum') return 'btn-quantum';
    return 'btn-primary';
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(7, 11, 18, 0.82)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div
        className="card-elevated"
        style={{
          maxWidth,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          padding: '1.75rem',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: subtitle ? '0.35rem' : '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {variant === 'danger' && (
              <div style={{
                color: 'var(--danger)',
                backgroundColor: 'rgba(255, 107, 107, 0.12)',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={20} />
              </div>
            )}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {subtitle && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.25rem'
          }}>
            {subtitle}
          </p>
        )}

        {/* Content Body */}
        <div style={{ marginBottom: '1.5rem' }}>
          {children}
        </div>

        {/* Footer Actions */}
        {(onConfirm || cancelText) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border)'
          }}>
            {cancelText && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelText}
              </button>
            )}
            {onConfirm && (
              <button
                type="button"
                className={`btn ${getConfirmBtnClass()}`}
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { QuantumCircuitPanel } from './QuantumCircuitPanel';

export const AuthLayout = ({ children, isSignup = false }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-main)',
      display: 'flex',
      alignItems: 'stretch'
    }}>
      {/* Left Column: Quantum Visual Brand Panel */}
      <div style={{
        display: 'flex',
        flex: 1.1,
        maxWidth: '560px'
      }} className="brand-panel-wrapper">
        <QuantumCircuitPanel isSignup={isSignup} />
      </div>

      {/* Right Column: Form Card Area */}
      <div style={{
        flex: 1.2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
        overflowY: 'auto'
      }}>
        {children}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .brand-panel-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

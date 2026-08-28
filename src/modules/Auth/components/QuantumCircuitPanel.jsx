import React from 'react';
import { Atom, Activity, ShieldCheck, Sparkles } from 'lucide-react';
import { BRAND_TEXT } from '../utils/authConstants';

export const QuantumCircuitPanel = ({ isSignup = false }) => {
  return (
    <div style={{
      flex: 1,
      background: 'linear-gradient(135deg, #F8FAFC 0%, #F3F7FF 50%, #EAF2FF 100%)',
      borderRight: '1px solid #E2E8F0',
      padding: '3.5rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100%'
    }}>
      {/* Background Subtle Gradient Blobs */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-15%',
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Top Header & Brand */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563EB'
          }}>
            <Atom size={24} />
          </div>

          <div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#0F172A',
              lineHeight: 1
            }} className="font-mono">
              Q-PARKINSON
            </div>
            <div style={{
              fontSize: '0.65rem',
              color: '#06B6D4',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '0.2rem'
            }} className="font-mono">
              QUANTUM-ENABLED PLATFORM
            </div>
          </div>
        </div>

        <h1 style={{
          fontSize: '1.95rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#0F172A',
          lineHeight: 1.25,
          marginBottom: '0.85rem'
        }}>
          {isSignup ? (
            <>
              Join Q-PARKINSON
              <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#475569', marginTop: '0.4rem' }}>
                Build better insight through medical, AI and quantum intelligence.
              </span>
            </>
          ) : (
            BRAND_TEXT.SUBTITLE
          )}
        </h1>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.75rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '9999px',
          border: '1px solid #E2E8F0',
          fontSize: '0.775rem',
          fontWeight: 600,
          color: '#0F3D91',
          marginBottom: '2rem'
        }} className="font-mono">
          <Sparkles size={14} color="#06B6D4" /> {BRAND_TEXT.TAGLINE}
        </div>
      </div>

      {/* Middle Visual: Minimal Neural Pathways & Circuit Schematic */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E2E8F0',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.08em' }} className="font-mono">
            VARIATIONAL QUANTUM CIRCUIT SCHEMATIC
          </span>
          <span className="badge badge-cyan font-mono">MODEL v1.0</span>
        </div>

        {/* SVG Quantum Circuit Lines & Nodes */}
        <svg width="100%" height="110" viewBox="0 0 360 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wire q0 */}
          <text x="5" y="38" fill="#475569" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">q0</text>
          <line x1="30" y1="34" x2="340" y2="34" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Wire q1 */}
          <text x="5" y="78" fill="#475569" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">q1</text>
          <line x1="30" y1="74" x2="340" y2="74" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Gate RY on q0 */}
          <rect x="70" y="20" width="36" height="28" rx="6" fill="#F3F7FF" stroke="#2563EB" strokeWidth="1.5" />
          <text x="88" y="38" textAnchor="middle" fill="#2563EB" fontSize="10" fontFamily="IBM Plex Mono" fontWeight="bold">RY</text>

          {/* Gate RY on q1 */}
          <rect x="70" y="60" width="36" height="28" rx="6" fill="#F3F7FF" stroke="#2563EB" strokeWidth="1.5" />
          <text x="88" y="78" textAnchor="middle" fill="#2563EB" fontSize="10" fontFamily="IBM Plex Mono" fontWeight="bold">RY</text>

          {/* CNOT Control (q0) to Target (q1) */}
          <line x1="160" y1="34" x2="160" y2="74" stroke="#06B6D4" strokeWidth="2" />
          <circle cx="160" cy="34" r="5" fill="#06B6D4" />
          <circle cx="160" cy="74" r="9" fill="#FFFFFF" stroke="#06B6D4" strokeWidth="2" />
          <line x1="160" y1="68" x2="160" y2="80" stroke="#06B6D4" strokeWidth="2" />
          <line x1="154" y1="74" x2="166" y2="74" stroke="#06B6D4" strokeWidth="2" />

          {/* Gate RX on q0 */}
          <rect x="230" y="20" width="36" height="28" rx="6" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="1.5" />
          <text x="248" y="38" textAnchor="middle" fill="#7C3AED" fontSize="10" fontFamily="IBM Plex Mono" fontWeight="bold">RX</text>

          {/* Gate RX on q1 */}
          <rect x="230" y="60" width="36" height="28" rx="6" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="1.5" />
          <text x="248" y="78" textAnchor="middle" fill="#7C3AED" fontSize="10" fontFamily="IBM Plex Mono" fontWeight="bold">RX</text>

          {/* Measurement Meter Node */}
          <circle cx="310" cy="34" r="8" fill="#00E5FF" />
          <circle cx="310" cy="74" r="8" fill="#8B5CF6" />
        </svg>

        {/* Textual Quantum Circuit Notation as requested */}
        <div style={{
          marginTop: '0.85rem',
          padding: '0.65rem 0.85rem',
          backgroundColor: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          fontSize: '0.75rem',
          color: '#475569',
          lineHeight: 1.6
        }} className="font-mono">
          <div><span style={{ color: '#2563EB' }}>q0</span> ──RY────●────RX──── [State Vector]</div>
          <div><span style={{ color: '#06B6D4' }}>q1</span> ──RY────X────RX──── [Feature Map]</div>
        </div>
      </div>

      {/* Footer Support Notice */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.8rem',
          color: '#475569'
        }}>
          <ShieldCheck size={16} color="#2563EB" />
          <span>Research-driven risk assessment and longitudinal health monitoring.</span>
        </div>
      </div>
    </div>
  );
};

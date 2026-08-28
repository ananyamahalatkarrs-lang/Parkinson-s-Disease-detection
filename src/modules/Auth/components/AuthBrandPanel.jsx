import React from 'react';
import { Atom, Activity, Database, Cpu, ShieldCheck } from 'lucide-react';
import { BRAND_TEXT } from '../utils/authConstants';

export const AuthBrandPanel = () => {
  return (
    <div style={{
      flex: 1,
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      padding: '3rem 2.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100%'
    }}>
      {/* Background Subtle Gradient */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '120%',
        height: '120%',
        background: 'radial-gradient(circle at 20% 30%, rgba(76, 141, 255, 0.08) 0%, rgba(53, 214, 232, 0.04) 35%, rgba(7, 11, 18, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Brand Header */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'rgba(53, 214, 232, 0.12)',
            border: '1px solid rgba(53, 214, 232, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--quantum)'
          }}>
            <Atom size={24} />
          </div>
          <div>
            <h1 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
              lineHeight: 1
            }} className="font-mono">
              {BRAND_TEXT.NAME}
            </h1>
            <div style={{
              fontSize: '0.65rem',
              color: 'var(--quantum)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '0.2rem'
            }}>
              DEEP-TECH HEALTHCARE
            </div>
          </div>
        </div>

        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          lineHeight: 1.25,
          marginBottom: '0.75rem'
        }}>
          {BRAND_TEXT.SUBTITLE}
        </h2>

        <p style={{
          fontSize: '0.925rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '440px'
        }}>
          {BRAND_TEXT.TAGLINE}
        </p>
      </div>

      {/* Scientific SVG Visualization: Neural -> Streams -> Quantum Nodes -> Hybrid Intelligence */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        margin: '2rem 0',
        padding: '1.75rem 1.5rem',
        backgroundColor: 'rgba(17, 27, 42, 0.7)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }} className="font-mono">
          <Activity size={14} color="var(--quantum)" /> HYBRID AI/QML PIPELINE SCHEMATIC
        </div>

        <svg width="100%" height="160" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Connecting Data Stream Lines */}
          <path d="M 60 80 Q 120 30, 180 80 T 300 80" stroke="#243247" strokeWidth="2" fill="none" />
          <path d="M 60 80 Q 120 130, 180 80 T 340 80" stroke="#243247" strokeWidth="2" strokeDasharray="4 4" fill="none" />

          {/* Glowing Animated Data Flow Path */}
          <path d="M 60 80 C 120 40, 150 120, 220 80 S 300 40, 340 80" stroke="url(#quantumGlow)" strokeWidth="2.5" fill="none">
            <animate attributeName="stroke-dashoffset" values="100;0" dur="4s" repeatCount="indefinite" />
          </path>

          {/* Node 1: Neural Signal Input */}
          <g transform="translate(60, 80)">
            <circle r="22" fill="#111B2A" stroke="#4C8DFF" strokeWidth="2" />
            <circle r="6" fill="#4C8DFF" />
            <text x="0" y="36" textAnchor="middle" fill="#9AA8BA" fontSize="9" fontFamily="IBM Plex Mono">NEURAL SIGNAL</text>
          </g>

          {/* Node 2: Multi-Modal Feature Vector */}
          <g transform="translate(150, 80)">
            <circle r="18" fill="#111B2A" stroke="#243247" strokeWidth="2" />
            <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#8DB8FF" />
            <text x="0" y="34" textAnchor="middle" fill="#9AA8BA" fontSize="9" fontFamily="IBM Plex Mono">FEATURES</text>
          </g>

          {/* Node 3: Variational Quantum Circuit */}
          <g transform="translate(240, 80)">
            <circle r="24" fill="#111B2A" stroke="#35D6E8" strokeWidth="2" />
            <polygon points="0,-10 9,6 -9,6" fill="#35D6E8" />
            <text x="0" y="38" textAnchor="middle" fill="#35D6E8" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">QUANTUM NODE</text>
          </g>

          {/* Node 4: Hybrid Risk Intelligence */}
          <g transform="translate(340, 80)">
            <circle r="20" fill="#162235" stroke="#39C98A" strokeWidth="2" />
            <circle r="5" fill="#39C98A" />
            <text x="0" y="34" textAnchor="middle" fill="#39C98A" fontSize="9" fontFamily="IBM Plex Mono">RISK VECTOR</text>
          </g>

          <defs>
            <linearGradient id="quantumGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4C8DFF" />
              <stop offset="50%" stopColor="#35D6E8" />
              <stop offset="100%" stopColor="#39C98A" />
            </linearGradient>
          </defs>
        </svg>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          marginTop: '1rem',
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <Cpu size={14} color="var(--primary)" /> Classical ML Acceleration
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <Atom size={14} color="var(--quantum)" /> 8-Qubit Variational Circuit
          </div>
        </div>
      </div>

      {/* Medical Safety Disclaimer Footer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.65rem',
          padding: '0.85rem 1rem',
          backgroundColor: 'rgba(7, 11, 18, 0.6)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5
        }}>
          <ShieldCheck size={16} color="var(--quantum)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <span>{BRAND_TEXT.DISCLAIMER}</span>
        </div>
      </div>
    </div>
  );
};

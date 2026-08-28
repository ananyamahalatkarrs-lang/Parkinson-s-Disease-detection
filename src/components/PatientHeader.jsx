import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Search, Bell, ShieldCheck, HeartPulse } from 'lucide-react';

export const PatientHeader = () => {
  const { currentUser } = useAuth();
  const { patient } = useApp();

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.75rem',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      {/* Search */}
      <div style={{ position: 'relative', width: '340px' }}>
        <Search size={16} style={{
          position: 'absolute',
          left: '0.85rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#94A3B8'
        }} />
        <input
          type="text"
          placeholder="Search assessment results, trends, features..."
          className="input-field"
          style={{
            paddingLeft: '2.4rem',
            fontSize: '0.825rem',
            height: '36px',
            backgroundColor: '#F8FAFC'
          }}
        />
      </div>

      {/* Right Telemetry Badge & User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div className="badge badge-info font-mono" style={{ padding: '0.35rem 0.75rem' }}>
          <HeartPulse size={13} color="#2563EB" /> RISK ASSESSMENT TELEMETRY ONLINE
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#E2E8F0' }} />

        {/* User Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            {currentUser?.name?.charAt(0) || patient?.name?.charAt(0) || 'P'}
          </div>
          <div>
            <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.1 }}>
              {currentUser?.name || patient?.name || 'Alex Morgan'}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: '2px' }}>
              Patient Portal
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

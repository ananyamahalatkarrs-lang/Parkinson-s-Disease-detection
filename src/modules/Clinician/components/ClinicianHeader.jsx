import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Search, Bell, Stethoscope, ShieldCheck } from 'lucide-react';

export const ClinicianHeader = () => {
  const { currentUser } = useAuth();

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
      {/* Global Clinical Search */}
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
          placeholder="Search patients, assessment IDs, trends..."
          className="input-field"
          style={{
            paddingLeft: '2.4rem',
            fontSize: '0.825rem',
            height: '36px',
            backgroundColor: '#F8FAFC'
          }}
        />
      </div>

      {/* Right Action Icons & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div className="badge badge-info font-mono" style={{ padding: '0.35rem 0.75rem' }}>
          <ShieldCheck size={13} color="#2563EB" /> DECISION SUPPORT ACTIVE
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#E2E8F0' }} />

        {/* Notifications */}
        <button
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            color: '#475569',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
          title="Clinical Notifications"
        >
          <Bell size={16} />
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '7px',
            height: '7px',
            backgroundColor: '#2563EB',
            borderRadius: '50%'
          }} />
        </button>

        {/* Doctor Profile Tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.35rem 0.75rem',
          backgroundColor: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0'
        }}>
          <Stethoscope size={16} color="#2563EB" />
          <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A' }}>
            Dr. Aris Thorne
          </div>
        </div>
      </div>
    </header>
  );
};

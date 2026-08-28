import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Search, Bell, Stethoscope, ShieldCheck } from 'lucide-react';
import { RoleSwitcher } from '../../../components/RoleSwitcher';

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
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={16} style={{
          position: 'absolute',
          left: '0.85rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#94A3B8'
        }} />
        <input
          type="text"
          placeholder="Search patients, assessment IDs..."
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <RoleSwitcher />

        <div className="badge badge-info font-mono" style={{ padding: '0.35rem 0.75rem' }}>
          <ShieldCheck size={13} color="#2563EB" /> DECISION SUPPORT ACTIVE
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#E2E8F0' }} />

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
            {currentUser?.name || 'Dr. Aris Thorne'}
          </div>
        </div>
      </div>
    </header>
  );
};

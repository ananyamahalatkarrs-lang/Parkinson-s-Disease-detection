import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClinicianSidebar } from './ClinicianSidebar';
import { ClinicianHeader } from './ClinicianHeader';

export const ClinicianLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* 240px Sidebar */}
      <ClinicianSidebar />

      {/* Main Content Viewport */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <ClinicianHeader />
        <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

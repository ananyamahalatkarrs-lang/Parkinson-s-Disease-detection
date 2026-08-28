import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  TrendingUp,
  CalendarCheck,
  FileText,
  Settings,
  Atom,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';
import { BRAND_TEXT } from '../../Auth/utils/authConstants';

export const ClinicianSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navSections = [
    {
      heading: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/clinician/dashboard', icon: LayoutDashboard, exact: true }
      ]
    },
    {
      heading: 'PATIENT MANAGEMENT',
      items: [
        { label: 'Patients', path: '/clinician/patients', icon: Users },
        { label: 'Assessments', path: '/clinician/assessments', icon: ClipboardList }
      ]
    },
    {
      heading: 'CLINICAL',
      items: [
        { label: 'Patient Trends', path: '/clinician/trends', icon: TrendingUp },
        { label: 'Follow-ups', path: '/clinician/followups', icon: CalendarCheck },
        { label: 'Reports', path: '/clinician/reports', icon: FileText }
      ]
    },
    {
      heading: 'SYSTEM',
      items: [
        { label: 'Settings', path: '/clinician/settings', icon: Settings },
        { label: 'Patient Portal', path: '/', icon: Home }
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={{
      width: collapsed ? '74px' : '246px',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      userSelect: 'none'
    }}>
      {/* Top Header & Brand */}
      <div>
        <div style={{
          padding: '1.25rem 1.25rem 1rem 1.25rem',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#F3F7FF',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563EB',
              flexShrink: 0
            }}>
              <Atom size={20} />
            </div>
            {!collapsed && (
              <div>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#0F172A',
                  lineHeight: 1
                }} className="font-mono">
                  {BRAND_TEXT.NAME}
                </div>
                <div style={{
                  fontSize: '0.625rem',
                  color: '#475569',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  marginTop: '0.2rem'
                }}>
                  Hybrid Intelligence
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Section Items */}
        <nav style={{ padding: '1rem 0.75rem', overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
          {navSections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              {!collapsed && (
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0 0.75rem 0.5rem 0.75rem'
                }} className="font-mono">
                  {section.heading}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={itemIdx}
                      to={item.path}
                      end={item.exact}
                      style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '10px',
                        color: isActive ? '#2563EB' : '#475569',
                        backgroundColor: isActive ? '#EAF2FF' : 'transparent',
                        fontWeight: isActive ? 700 : 500,
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        transition: 'all 0.15s ease-in-out',
                        justifyContent: collapsed ? 'center' : 'flex-start'
                      })}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={18} style={{ flexShrink: 0 }} />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Doctor Profile Card */}
      <div style={{
        padding: '0.85rem 0.75rem',
        borderTop: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC'
      }}>
        {/* Doctor Profile Link */}
        <NavLink
          to="/clinician/settings"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.5rem',
            borderRadius: '8px',
            color: '#0F172A',
            backgroundColor: isActive ? '#EAF2FF' : 'transparent',
            textDecoration: 'none',
            fontSize: '0.85rem',
            marginBottom: '0.25rem',
            justifyContent: collapsed ? 'center' : 'flex-start'
          })}
        >
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            flexShrink: 0
          }}>
            {currentUser?.name?.charAt(0) || 'D'}
          </div>
          {!collapsed && (
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{
                fontSize: '0.825rem',
                fontWeight: 700,
                color: '#0F172A',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Dr. Aris Thorne
              </div>
              <div style={{ fontSize: '0.7rem', color: '#475569' }}>
                Clinician
              </div>
            </div>
          )}
        </NavLink>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.45rem 0.5rem',
            borderRadius: '8px',
            color: '#EF4444',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8rem',
            justifyContent: collapsed ? 'center' : 'flex-start'
          }}
          title="Sign out of workspace"
        >
          <LogOut size={16} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

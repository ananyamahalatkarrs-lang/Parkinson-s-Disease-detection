import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Users,
  Activity,
  Server,
  Database,
  Lock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { BRAND_TEXT } from '../modules/Auth/utils/authConstants';

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const usersList = [
    { name: 'Dr. Aris Thorne', email: 'clinician@qparkinson.org', role: 'Doctor / Clinician', status: 'ACTIVE', lastLogin: 'Aug 28, 2026 12:45' },
    { name: 'Alex Morgan', email: 'patient@qparkinson.org', role: 'Patient', status: 'ACTIVE', lastLogin: 'Aug 28, 2026 11:20' },
    { name: 'Dr. Evelyn Reed', email: 'researcher@qparkinson.org', role: 'Researcher', status: 'ACTIVE', lastLogin: 'Aug 27, 2026 16:10' },
    { name: 'System Admin', email: 'admin@qparkinson.org', role: 'Admin', status: 'ACTIVE', lastLogin: 'Aug 28, 2026 13:00' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Admin Sidebar */}
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
                <ShieldCheck size={20} />
              </div>
              {!collapsed && (
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }} className="font-mono">
                    {BRAND_TEXT.NAME}
                  </div>
                  <div style={{ fontSize: '0.625rem', color: '#475569', fontWeight: 600, marginTop: '0.2rem' }}>
                    System Control Center
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.25rem' }}>
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav style={{ padding: '1rem 0.75rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              {!collapsed && (
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', padding: '0 0.75rem 0.5rem 0.75rem' }} className="font-mono">
                  ADMINISTRATION
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {[
                  { id: 'users', label: 'User & Role Control', icon: Users },
                  { id: 'health', label: 'System Monitoring', icon: Server },
                  { id: 'models', label: 'Model Version Registry', icon: Database },
                  { id: 'audit', label: 'Audit Logs', icon: Lock }
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '10px',
                        color: isActive ? '#2563EB' : '#475569',
                        backgroundColor: isActive ? '#EAF2FF' : 'transparent',
                        fontWeight: isActive ? 700 : 500,
                        border: 'none',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      <Icon size={18} />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Footer Profile */}
        <div style={{ padding: '0.85rem 0.75rem', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem', marginBottom: '0.25rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#10B981', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            {!collapsed && (
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser?.name || 'System Admin'}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#475569' }}>
                  Administrator
                </div>
              </div>
            )}
          </div>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.45rem 0.5rem', borderRadius: '8px', color: '#EF4444', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: '64px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.75rem', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ position: 'relative', width: '340px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input type="text" placeholder="Search user accounts, audit logs, system events..." className="input-field" style={{ paddingLeft: '2.4rem', fontSize: '0.825rem', height: '36px', backgroundColor: '#F8FAFC' }} />
          </div>
          <div className="badge badge-success font-mono" style={{ padding: '0.35rem 0.75rem' }}>
            <ShieldCheck size={13} color="#10B981" /> SYSTEM CONTROL CENTER ONLINE
          </div>
        </header>

        <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-blue)', letterSpacing: '0.08em', marginBottom: '0.25rem' }} className="font-mono">
              SYSTEM CONTROL CENTER & AUDIT TELEMETRY
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Platform Administration & Role Control
            </h1>
          </div>

          {/* Metric Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
            <div className="card-base" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">REGISTERED USERS</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0' }}>4 Roles</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Patient, Doctor, Researcher, Admin</div>
            </div>
            <div className="card-base" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">PLATFORM UPTIME</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--success)', margin: '0.25rem 0' }}>99.98%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Express + MongoDB Cluster</div>
            </div>
            <div className="card-base" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">ACTIVE MODEL RELEASE</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-blue)', margin: '0.25rem 0' }}>v2.4-qsvc</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Hybrid StateVector QML Engine</div>
            </div>
            <div className="card-base" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }} className="font-mono">AUDIT LOG TRAIL</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--violet)', margin: '0.25rem 0' }}>142 Events</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Real-time IP & Action Telemetry</div>
            </div>
          </div>

          {/* User Management Table */}
          <div className="card-base" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              User Account & Role Control
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">FULL NAME</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">EMAIL ADDRESS</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">ASSIGNED ROLE</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">STATUS</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }} className="font-mono">LAST ACTIVITY</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{u.name}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-info font-mono">{u.role}</span></td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-success font-mono">{u.status}</span></td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{u.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

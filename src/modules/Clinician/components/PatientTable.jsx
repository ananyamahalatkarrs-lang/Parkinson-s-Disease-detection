import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const PatientTable = ({ patients }) => {
  const getTrendBadge = (trend) => {
    if (trend === 'Stable') {
      return <span className="badge badge-success"><CheckCircle2 size={12} /> Stable</span>;
    }
    if (trend === 'Changed') {
      return <span className="badge badge-danger"><AlertCircle size={12} /> Changed</span>;
    }
    return <span className="badge badge-info">{trend}</span>;
  };

  const getStatusBadge = (status) => {
    if (status === 'Review') {
      return <span className="badge badge-info">● Review Due</span>;
    }
    return <span className="badge badge-success">● Monitoring</span>;
  };

  return (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)',
      backgroundColor: 'var(--bg-white)',
      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '0.875rem'
      }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
            <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Patient ID
            </th>
            <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Patient Name
            </th>
            <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Latest Assessment
            </th>
            <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Observed Trend
            </th>
            <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Clinical Status
            </th>
            <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', textAlign: 'right' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="font-mono" style={{ fontWeight: 700, color: 'var(--deep-blue)' }}>
                {patient.id}
              </td>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                <Link to={`/clinician/patients/${patient.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {patient.name}
                </Link>
              </td>
              <td className="font-mono" style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {patient.latestAssessmentDate}
              </td>
              <td>{getTrendBadge(patient.observedTrend)}</td>
              <td>{getStatusBadge(patient.status)}</td>
              <td style={{ textAlign: 'right' }}>
                <Link
                  to={`/clinician/patients/${patient.id}`}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Eye size={14} /> View Record
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

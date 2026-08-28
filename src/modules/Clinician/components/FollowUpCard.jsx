import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Eye, Plus } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

export const FollowUpCard = ({ followUps, onScheduleClick }) => {
  return (
    <div className="card-base" style={{ padding: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            color: 'var(--primary-blue)',
            backgroundColor: 'var(--bg-light-blue)',
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            <CalendarCheck size={18} />
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Upcoming Follow-ups
          </h3>
        </div>

        {onScheduleClick && (
          <button onClick={onScheduleClick} className="btn btn-primary btn-sm">
            <Plus size={14} /> Schedule Follow-up
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {followUps?.slice(0, 4).map((item, idx) => (
          <div key={idx} style={{
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                {item.patientName}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} className="font-mono">
                Follow-up Date: <strong style={{ color: 'var(--primary-blue)' }}>{item.followUpDate}</strong> | Last: {item.latestAssessmentDate}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Badge variant={item.status === 'Overdue' ? 'danger' : 'success'}>
                {item.status}
              </Badge>

              <Link
                to={`/clinician/patients/${item.patientId}`}
                className="btn btn-secondary btn-sm"
              >
                <Eye size={14} /> View Patient
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

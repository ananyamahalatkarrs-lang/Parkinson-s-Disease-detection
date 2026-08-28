import React, { useState, useEffect } from 'react';
import { clinicianService } from '../services/clinicianService';
import { usePatients } from '../hooks/usePatients';
import { FollowUpModal } from '../components/FollowUpModal';
import { LoadingState } from '../../../components/common/LoadingState';
import { ErrorState } from '../../../components/common/ErrorState';
import { Badge } from '../../../components/common/Badge';
import { CalendarCheck, Plus, Search, Filter, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FollowUpManagement = () => {
  const { patients } = usePatients();
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchFollowUps = async () => {
    setLoading(true);
    try {
      const res = await clinicianService.getFollowUps();
      setFollowUps(res);
    } catch (err) {
      setError('Failed to fetch follow-ups.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const filteredFollowUps = followUps.filter(f => {
    if (statusFilter === 'ALL') return true;
    return f.status === statusFilter;
  });

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            FOLLOW-UP MANAGEMENT
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Schedule and track clinical longitudinal check-in appointments.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Schedule Follow-up
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card-base" style={{
        padding: '0.85rem 1rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={15} color="var(--text-muted)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select-field"
            style={{ width: '170px' }}
          >
            <option value="ALL">All Follow-ups</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <span className="font-mono" style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
          Total Scheduled: {filteredFollowUps.length}
        </span>
      </div>

      {loading ? (
        <LoadingState message="Loading follow-up schedule..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchFollowUps} />
      ) : (
        <div className="card-base" style={{ padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>PATIENT NAME</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>FOLLOW-UP DATE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>LAST ASSESSMENT</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>OBSERVED TREND</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredFollowUps.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.patientName}</td>
                  <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>{item.followUpDate}</td>
                  <td className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>{item.latestAssessmentDate}</td>
                  <td>
                    <Badge variant={item.observedTrend === 'Stable' ? 'success' : 'danger'}>
                      {item.observedTrend}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={item.status === 'Overdue' ? 'danger' : 'info'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/clinician/patients/${item.patientId}`} className="btn btn-secondary btn-sm">
                      <Eye size={14} /> View Patient
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Schedule Modal */}
      <FollowUpModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        patients={patients}
        onSchedule={async (pid, date, notes) => {
          await clinicianService.scheduleFollowUp(pid, date, notes);
          await fetchFollowUps();
        }}
      />
    </div>
  );
};

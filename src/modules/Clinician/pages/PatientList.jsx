import React from 'react';
import { usePatients } from '../hooks/usePatients';
import { PatientTable } from '../components/PatientTable';
import { LoadingState } from '../../../components/common/LoadingState';
import { ErrorState } from '../../../components/common/ErrorState';
import { Search, Filter, UserCheck } from 'lucide-react';

export const PatientList = () => {
  const { patients, loading, error, filters, setFilters, refetch } = usePatients();

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          PATIENT DIRECTORY
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Longitudinal cohort registry and clinical monitoring directory.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-base" style={{
        padding: '1rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '0.85rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Search by patient ID or name..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="input-field"
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Trend:</span>
            <select
              value={filters.trend}
              onChange={(e) => setFilters(prev => ({ ...prev, trend: e.target.value }))}
              className="select-field"
              style={{ width: '140px' }}
            >
              <option value="ALL">All Trends</option>
              <option value="Stable">Stable</option>
              <option value="Changed">Changed</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="select-field"
              style={{ width: '140px' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="Review">Review Due</option>
              <option value="Monitoring">Monitoring</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Fetching patient directory..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <PatientTable patients={patients} />
      )}
    </div>
  );
};

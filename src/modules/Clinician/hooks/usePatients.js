import { useState, useEffect, useCallback } from 'react';
import { clinicianService } from '../services/clinicianService';

export const usePatients = (initialFilters = { search: '', trend: 'ALL', status: 'ALL' }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await clinicianService.getPatients(filters);
      setPatients(res);
    } catch (err) {
      setError(err.message || 'Failed to load patient records.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchPatients
  };
};

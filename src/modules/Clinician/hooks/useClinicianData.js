import { useState, useEffect, useCallback } from 'react';
import { clinicianService } from '../services/clinicianService';

export const useClinicianData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await clinicianService.getDashboardOverview();
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to fetch clinician dashboard overview.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return {
    overview: data,
    loading,
    error,
    refetch: fetchOverview
  };
};

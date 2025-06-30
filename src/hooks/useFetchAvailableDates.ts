import React, { useState, useEffect } from 'react';
import { useAthena } from './useAthena';

interface UseFetchAvailableDatesResult {
  availableDates: number[];
  loading: boolean;
  error: string | null;
}

export const useFetchAvailableDates = (
  month: number,
  year: number
): UseFetchAvailableDatesResult => {
  const [availableDates, setAvailableDates] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const athena = useAthena();

  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (!month || !year) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/consultation/available-dates?month=${month + 1}&year=${year}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const message = `Server error: ${response.status}`;
          athena.throwError({
            status: response.status,
            message,
          });

          setError(message);
          setAvailableDates([]);

          return;
        }

        const data = await response.json();
        setAvailableDates(data.availableDates);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        athena.throwError({ status: 500, message });
        setError(message);
        console.error('Error fetching available dates:', error);
        setAvailableDates([]);
      }
    };

    fetchAvailableDates();
  }, [month, year]);

  return { availableDates, loading, error };
};

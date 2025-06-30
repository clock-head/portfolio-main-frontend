import { useState, useEffect } from 'react';
import { DateInput } from 'src/types/DateInput';

type Timeslot = { id: string; start: string; end: string };

interface TimeslotResponse {
  availableTimeslots: string[];
}

interface UseFetchAvailableTimeslotsResult {
  availableTimeslots: string[];
  loading: boolean;
  error: string | null;
}

export const useFetchAvailableTimeslots = (
  date: DateInput | null
): UseFetchAvailableTimeslotsResult => {
  const [availableTimeslots, setAvailableTimeslots] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!date?.day) return;

      const monthString = (date.month + 1).toString().padStart(2, '0');
      const dayString = date.day.toString().padStart(2, '0');
      const formattedDate = `${date.year}-${monthString}-${dayString}`;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/consultation/available-timeslots?date=${formattedDate}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data: TimeslotResponse = await response.json();
        setAvailableTimeslots(data.availableTimeslots || []);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Error fetching timeslots';

        setAvailableTimeslots([]);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [date]);

  return { availableTimeslots, loading, error };
};

import { useState, useEffect } from 'react';

export const useFetchAvailableTimeslots = (date) => {
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

        const data = await response.json();
        setAvailableTimeslots(data.availableTimeslots || []);
      } catch (error) {
        setAvailableTimeslots([]);
        setError(error.message || 'Error fetching timeslots');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [date]);

  return { availableTimeslots, loading, error };
};

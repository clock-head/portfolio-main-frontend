import { useState } from 'react';
import { AthenaCore } from 'athena-core';

interface BookingDetails {
  startTime: string;
  endTime: string;
  timeZone: string;
  phone?: string;
}

interface UseBookConsultationResult {
  bookConsultation: (details: BookingDetails) => Promise<void>;
  loading: boolean;
}

export const useBookConsultation = (): UseBookConsultationResult => {
  const [loading, setLoading] = useState(false);

  const bookConsultation = async (details: BookingDetails): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/consultation/create`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        }
      );

      if (!response.ok) {
        AthenaCore.throwError({
          status: response.status,
          message: 'Failed to book consultation. Please try again.',
        });
      }

      const data = await response.json();
      AthenaCore.openModal({
        title: 'Success',
        message: 'Consultation successfully booked.',
        type: 'success',
      });
      AthenaCore.sealLog('Consultation booked', { details, data });
    } catch (error) {
      AthenaCore.openModal({
        title: 'Booking Error',
        message:
          error instanceof Error ? error.message : 'Unknown booking error.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return { bookConsultation, loading };
};

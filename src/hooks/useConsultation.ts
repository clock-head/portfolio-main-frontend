import { useState } from 'react';
import { AthenaCore } from 'athena-core';
import { User } from '../types/Auth';

// Booking details for create function
interface BookingDetails {
  selectedDate: Date;
  startTime: string;
  endTime: string;
  timeZone: string;
  phone?: string;
}

// Consultation details for get function to retrieve consultation.
export interface ConsultationDetails {
  consultation_id: number;
  startTime: string;
  endTime: string;
  resolutionStatus: string;
  selectedDate: string;
  hasRescheduled: boolean;
  userId: number;
  isPaid: boolean;
}

interface UseBookConsultationResult {
  fetchConsultation: () => Promise<ConsultationDetails | null>;
  bookConsultation: (details: BookingDetails) => Promise<void>;
  consultation: ConsultationDetails | null;
  loading: boolean;
}

export const useConsultation = (): UseBookConsultationResult => {
  const [loading, setLoading] = useState(false);
  const [consultation, setConsultation] = useState<ConsultationDetails | null>(
    null
  );

  const fetchConsultation = async (): Promise<ConsultationDetails | null> => {
    setLoading(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/consultation/my-active-consultation`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        AthenaCore.throwError({
          status: response.status,
          message: data?.message || 'failed to retrieve booking consultation',
        });
      }

      console.log('Consultation fetched:', data.consultation);

      setLoading(false);
      setConsultation(data.consultation);
      return data.consultation;
    } catch (error: unknown) {
      setLoading(false);
      AthenaCore.throwError({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Internal Server Error.',
      });

      return null;
    }
  };

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
      AthenaCore.redirect('/payment?type=consultation');
    } catch (error) {
      AthenaCore.openModal({
        title: 'Booking Error',
        message:
          error instanceof Error ? error.message : 'Unknown booking error.',
        type: 'error',
      });

      AthenaCore.throwError({
        status: 500,
        message: error instanceof Error ? error.message : 'Booking error.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { fetchConsultation, bookConsultation, consultation, loading };
};

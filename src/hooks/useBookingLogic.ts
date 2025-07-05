import { useState } from 'react';
import { useFetchAvailableTimeslots } from './useFetchAvailableTimeslots';

import { DateInput, DateInputDaySelectedState } from 'src/types/DateInput';

export const useBookingLogic = () => {
  const today = new Date();

  const [date, setDate] = useState<DateInput>({
    day: null,
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const [time, setTime] = useState<string | null>(null);
  const { availableTimeslots, loading, error } =
    useFetchAvailableTimeslots(date);

  const timeslotIsAvailable = !!time && availableTimeslots.includes(time);

  const selectDay = (day: number) => {
    setDate((prev) => ({ ...prev, day }));
  };

  const selectTime = (selectedTime: string | null) => {
    setTime(selectedTime);
  };

  const toggleMonth = (newDate: Date) => {
    setDate({
      day: null,
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    });
    setTime(null);
  };

  const resetBooking = () => {
    setDate({
      day: null,
      month: today.getMonth(),
      year: today.getFullYear(),
    });
    setTime(null);
  };

  return {
    date,
    time,
    timeslotIsAvailable,
    loading,
    error,
    availableTimeslots,
    selectDay,
    selectTime,
    toggleMonth,
    resetBooking,
  };
};

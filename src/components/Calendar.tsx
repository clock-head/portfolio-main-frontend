import React, { useState, useEffect } from 'react';
import Section from './Section';
import Unit from './Unit';
import './Calendar.css';
import Day from './Day';
import Modal from './Modal';
import { useFetchAvailableDates } from 'src/hooks/useFetchAvailableDates';

interface CalendarProps {
  selectDay: (day: number) => void;
  date: {
    year?: number;
    month?: number;
  };
}

const Calendar: React.FC<CalendarProps> = ({ selectDay, date }) => {
  const today = new Date();
  const year = date.year || today.getFullYear();
  const month = date.month || today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const { availableDates, loading, error } = useFetchAvailableDates(
    month,
    year
  );

  return (
    <Section
      id=""
      width="wide"
      gap=""
      alignItems=""
      alignContent=""
      justifyItems="right"
      justifyContent=""
      background=""
      padding=""
      layout="grid-calendar"
    >
      {/*toggle months*/}
      {/*toggle years*/}

      {Array.from({ length: firstDayOfMonth }, (_, i) => (
        // the Unit component here is looking for a children prop that its interface has specified.

        <Unit children key={i}></Unit>
      ))}
      {calendarDays.map((day) => {
        const isAvailable = availableDates.includes(day);

        return (
          <Unit key={day}>
            {/* the Day component here is claiming to have a children prop that the DayProps interface doesn't have a key value pair for */}

            <Day day={day} selectDay={selectDay} isAvailable={isAvailable}>
              {day}
            </Day>
          </Unit>
        );
      })}
    </Section>
  );
};

export default Calendar;

import React, { useState, useEffect } from 'react';
import Section from './Section';
import Unit from './Unit';
import './Calendar.css';
import Day from './Day';

const Calendar = ({ selectDay, date }) => {
  const today = new Date();
  const year = date.year || today.getFullYear();
  const month = date.month || today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        //fetch available dates from the backend
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
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Available dates: ', data);
        setAvailableDates(data.availableDates);
        console.log('Available dates set:', data.availableDates);
        console.log('Available dates state:', availableDates);
      } catch (error) {
        console.error('Error fetching available dates:', error);
        setAvailableDates([]);
      }
    };

    fetchAvailableDates();
  }, [month, year]);

  return (
    <Section width="wide" justifyItems="right" layout="grid-calendar">
      {/*toggle months*/}
      {/*toggle years*/}
      {Array.from({ length: firstDayOfMonth }, (_, i) => (
        <Unit key={i}></Unit>
      ))}
      {calendarDays.map((day) => {
        const isAvailable = availableDates.includes(day);
        date.day = day;

        return (
          <Unit key={day}>
            <Day day={date.day} selectDay={selectDay} isAvailable={isAvailable}>
              {day}
            </Day>
          </Unit>
        );
      })}
    </Section>
  );
};

export default Calendar;

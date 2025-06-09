import React from 'react';
import Section from './Section';
import Unit from './Unit';
import './Calendar.css';
import Day from './Day';

const Calendar = ({ selectDay }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  return (
    <Section width="wide" justifyItems="right" layout="grid-calendar">
      {Array.from({ length: firstDayOfMonth }, (_, i) => (
        <Unit key={i}></Unit>
      ))}
      {calendarDays.map((day) => (
        <Unit key={day}>
          <Day selectDay={selectDay}>{day}</Day>
        </Unit>
      ))}
    </Section>
  );
};

export default Calendar;

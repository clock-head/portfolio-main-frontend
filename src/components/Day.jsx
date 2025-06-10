import React from 'react';
import './Day.css'; // Assuming you have a CSS file for styling

const Day = ({ day, selectDay, isAvailable }) => {
  // const today = new Date();
  const availableClass = isAvailable ? 'available' : '';

  return (
    <div className="date-container">
      <button
        onClick={() => selectDay(day)}
        className={`date-button ${availableClass}`}
      >
        <p className="date-value">{day}</p>
      </button>
    </div>
  );
};

export default Day;

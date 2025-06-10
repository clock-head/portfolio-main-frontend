import React from 'react';
import './Day.css'; // Assuming you have a CSS file for styling

const Day = ({ children, selectDay, isAvailable }) => {
  // const today = new Date();
  const availableClass = isAvailable ? 'available' : '';

  return (
    <div className="date-container">
      <button
        onClick={() => selectDay(children)}
        className={`date-button ${availableClass}`}
      >
        <p className="date-value">{children}</p>
      </button>
    </div>
  );
};

export default Day;

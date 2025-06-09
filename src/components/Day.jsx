import React from 'react';
import './Day.css'; // Assuming you have a CSS file for styling

const Day = ({ children, selectDay }) => {
  // const today = new Date();

  return (
    <div className="date-container">
      <button onClick={() => selectDay(children)} className="date-button">
        <p className="date-value">{children}</p>
      </button>
    </div>
  );
};

export default Day;

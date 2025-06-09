import React from 'react';

const AppointmentDetails = ({ time }) => {
  return (
    <div className="appointment-details">
      <h3>{time}</h3>
    </div>
  );
};

export default AppointmentDetails;

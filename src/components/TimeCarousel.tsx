import React from 'react';
import './TimeCarousel.css';

const generateTimeSlots = () => {
  const slots = [];
  for (let h = 10; h < 18; h++) {
    const hour = h.toString().padStart(2, '0');
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  return slots;
};

const TimeCarousel = ({ selectTime, availableTimeslots }) => {
  const slots = generateTimeSlots();
  // console.log('Available timeslots:', availableTimeslots);

  return (
    <div className="time-carousel responsive-carousel time-carousel-grid-item">
      <div className="time-carousel-track">
        {slots.map((slot, index) => {
          const isAvailable = availableTimeslots.includes(slot);
          const availableClass = isAvailable ? 'available' : '';

          return (
            <button
              onClick={() => {
                selectTime(slot);
              }}
              key={index}
              className={`time-carousel-item ${availableClass}`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeCarousel;

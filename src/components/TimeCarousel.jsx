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

const TimeCarousel = ({ selectTime }) => {
  const slots = generateTimeSlots();

  return (
    <div className="time-carousel responsive-carousel">
      <div className="time-carousel-track">
        {slots.map((slot, index) => (
          <button
            onClick={() => {
              selectTime(slot);
            }}
            key={index}
            className="time-carousel-item"
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeCarousel;

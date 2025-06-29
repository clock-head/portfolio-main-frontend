import React, { useState, useEffect } from 'react';
import './ConsultationBookingForm.css';

const ConsultationBookingForm = ({ date, time, isAvailable }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');

  const hour = time.slice(0, 2);
  const minutes = time.slice(-2);

  const startTime = time;
  const endTime = minutes === '30' ? `${parseInt(hour) + 1}:00` : `${hour}:30`;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!isAvailable) return;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
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

          // if 401 no session token found, redirect to homepage to login or sign up.
        }

        const data = await response.json();
        setCurrentUser((prev) => data.user);
        setName((prev) => `${data.user.firstName} ${data.user.lastName}`);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, [time, isAvailable]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    const bookingDetails = {
      startTime: time,
      endTime: endTime,
      timeZone: timeZone,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/consultation/create`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingDetails),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Booking successful:', data);
      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking consultation:', error);
      alert('Failed to book consultation. Please try again later.');
    }
  };

  return (
    <div className="booking-form">
      {!isAvailable && <h3 className="not-available">{'Not Available'}</h3>}
      {isAvailable && <h3>{`${date.day}-0${date.month + 1}`}</h3>}
      {time ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Start Time:</label>
            <input type="text" name="name" value={startTime || ''} readOnly />
          </div>

          <div>
            <label>End Time:</label>
            <input type="email" name="email" value={endTime || ''} readOnly />
          </div>

          <div>
            <label>Phone:</label>
            <input type="tel" name="phone" placeholder="optional" />
          </div>

          <button
            type="submit"
            disabled={!isAvailable}
            className={!isAvailable ? 'not-available' : ''}
          >
            Book Consultation
          </button>
        </form>
      ) : (
        <p>This time slot is not available.</p>
      )}
    </div>
  );
};

export default ConsultationBookingForm;

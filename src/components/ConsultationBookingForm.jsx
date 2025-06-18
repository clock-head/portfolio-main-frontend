import React, { useState, useEffect } from 'react';
import './ConsultationBookingForm.css';

const ConsultationBookingForm = ({ time, isAvailable }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');

  const hour = time.slice(2);
  const minutes = time.slice(-2);
  console.log(hour);
  console.log(minutes);

  const startTime = time;
  console.log(startTime);
  const endTime = minutes === '30' ? `${hour + 1}:00` : `${hour}:30`;
  console.log(endTime);

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
    const formData = new FormData(event.target);
    const bookingDetails = {
      startTime: time,
      endTime: formData.get('last-name'),
      timeZone: 'Australia/Sydney',
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
      <h3>{time || ''}</h3>
      {!isAvailable ? (
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input type="text" name="name" value={name || ''} readOnly />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={currentUser?.email || ''}
              readOnly
            />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" placeholder="optional" />
          </label>
          <button type="submit">Book Consultation</button>
        </form>
      ) : (
        <p>This time slot is not available.</p>
      )}
    </div>
  );
};

export default ConsultationBookingForm;

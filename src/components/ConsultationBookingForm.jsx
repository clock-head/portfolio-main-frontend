import React, { useState, useEffect } from 'react';
import './ConsultationBookingForm.css';

const ConsultationBookingForm = ({ time, isAvailable }) => {
  const [currentUser, setCurrentUser] = useState(null);
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
      time: time,
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/consultation/book`,
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
      <h3>{time}</h3>
      {!isAvailable ? (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="first-name"
              value={currentUser?.firstName || ''}
              readOnly
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last-name"
              value={currentUser?.lastName || ''}
              readOnly
            />
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

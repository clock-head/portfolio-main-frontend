import React, { useState, useEffect } from 'react';
import './ConsultationBookingForm.css';
import { useConsultation } from '../hooks/useConsultation';
import { useAuth } from '../contexts/AuthProvider/AuthProvider';
import { DateInput, DateInputDaySelectedState } from 'src/types/DateInput';
import Button from './Button';
import { AthenaCore } from 'athena-core';

interface ConsultationBookingFormProps {
  date: DateInput;
  time: string;
  timeslotIsAvailable: boolean;
  handleCloseForm: () => void;
}

const ConsultationBookingForm: React.FC<ConsultationBookingFormProps> = ({
  date,
  time,
  timeslotIsAvailable,
  handleCloseForm,
}) => {
  // const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const { bookConsultation } = useConsultation();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const hour = time.slice(0, 2);
  const minutes = time.slice(-2);

  const startTime = time;
  const endTime = minutes === '30' ? `${parseInt(hour) + 1}:00` : `${hour}:30`;

  const day = date.day ? date.day : undefined;

  const selectedDate = new Date(date.year, date.month, day);

  // useEffect(() => {
  //   if (user) {
  //     setName(`${user.firstName} ${user.lastName}`);
  //   }
  // }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
      bookConsultation({
        selectedDate,
        startTime,
        endTime,
        timeZone,
        phone,
      });
    } else {
      AthenaCore.openModal({
        title: 'Login Required',
        message: 'please login to book a consultation.',
      });

      AthenaCore.redirect('/');
    }
  };

  return (
    <div className="form-overlay">
      <div className="booking-form">
        {!timeslotIsAvailable && (
          <h3 className="not-available">{'Not Available'}</h3>
        )}
        <Button variant="outline" onClick={handleCloseForm}>
          X
        </Button>
        {timeslotIsAvailable && <h3>{`${date.day}-0${date.month + 1}`}</h3>}
        {time ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Start Time:</label>
              <input type="text" name="start-time" value={startTime} readOnly />
            </div>

            <div>
              <label>End Time:</label>
              <input type="text" name="end-time" value={endTime} readOnly />
            </div>

            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                placeholder="optional"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={!timeslotIsAvailable}
              className={!timeslotIsAvailable ? 'not-available' : ''}
            >
              Book Consultation
            </button>
          </form>
        ) : (
          <p>This time slot is not available.</p>
        )}
      </div>
    </div>
  );
};

export default ConsultationBookingForm;

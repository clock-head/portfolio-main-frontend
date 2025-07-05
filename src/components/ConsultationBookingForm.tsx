import React, { useState, useEffect } from 'react';
import './ConsultationBookingForm.css';
import { useConsultation } from '../hooks/useConsultation';
import { useAuth } from '../contexts/AuthProvider/AuthProvider';
import { DateInput, DateInputDaySelectedState } from 'src/types/DateInput';
import Button from './Button';
import { AthenaCore } from 'athena-core';
import { format, addMonths, subMonths } from 'date-fns';
import Unit from './Unit';
import Section from './Section';

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
  const { isAuthenticated } = useAuth();

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

    console.log('isAuthenticated', isAuthenticated);

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
      AthenaCore.throwError({
        status: 401,
        message: 'You must be logged in to book a consultation.',
      });
    }
  };

  return (
    <div className="form-overlay">
      <div className="booking-form">
        <Section
          layout="flex"
          background="transparent"
          gap="lg"
          justifyContent="left"
        >
          <Unit layout="flex" flexGrow="4" gap="sm">
            {!timeslotIsAvailable && (
              <h3 className="not-available">{'Not Available'}</h3>
            )}

            {timeslotIsAvailable && (
              <h3>{`${date.day}-${format(selectedDate, 'MMMM')}`}</h3>
            )}
          </Unit>
          <Unit
            layout="flex"
            flexShrink="3"
            justifySelf="right"
            colSpan="0"
            rowSpan="0"
          >
            <Button
              variant="outline"
              onClick={handleCloseForm}
              intent="booking-form-close"
            >
              X
            </Button>
          </Unit>
        </Section>

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

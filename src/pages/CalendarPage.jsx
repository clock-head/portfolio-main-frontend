import React, { useState, useEffect } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import Section from '../components/Section';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Unit from '../components/Unit';
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import TimeCarousel from '../components/TimeCarousel';
import ConsultationBookingForm from '../components/ConsultationBookingForm';
import MonthToggle from '../components/MonthToggle';

export const CalendarPage = () => {
  const today = new Date();

  // getMonth() returns 0-11, so we add 1
  const [date, setDate] = useState({
    day: null,
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const [timeSelected, setTimeselected] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const context = {
    section: {
      layout: 'grid',
      background: 'bg-dark',
      justifyItems: 'center',
    },

    unit: {
      colSpan: '1',
      rowSpan: '1',
    },
  };

  const windowSize = useWindowSize();
  console.log(windowSize);

  const selectDay = (day) => {
    setDate((prevDate) => {
      return {
        ...prevDate,
        day: day,
      };
    });
    // console.log('Selected day:', date.day);
    // call getAvailableTimeslots API
  };

  const selectTime = (hour) => {
    setTimeselected((prevTime) => hour);
    // display form to fill in details
    if (availableTimeslots.includes(hour)) {
      setIsAvailable((prev) => true);
    } else {
      setIsAvailable(() => false);
    }
  };

  const toggleMonth = (date) => {
    setDate((prevDate) => {
      return {
        day: null,
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    });

    setTimeselected(() => null);
  };

  useEffect(() => {
    const fetchAvailableHours = async () => {
      if (!date.day) return;

      const monthString = (date.month + 1).toString().padStart(2, '0');
      const dayString = date.day.toString().padStart(2, '0');

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/consultation/available-timeslots?date=${
            date.year
          }-${monthString}-${dayString}?`,
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
        // console.log('Available timeslots:', data);
        setAvailableTimeslots((prev) => {
          // console.log('Setting available timeslots:', data.availableTimeslots);
          return data.availableTimeslots;
        });
      } catch (error) {
        console.error('Error fetching available timeslots:', error);
        setAvailableTimeslots([]);
      }
    };
    fetchAvailableHours();
  }, [date.day, date.month, date.year]);

  console.log(date.day);

  return (
    <Layout
      layout="grid"
      spacing="gap-md"
      alignContent="center"
      justifyItems="center"
      background="bg-dark"
      context={context}
    >
      <Section layout="appointment-grid" padding="py-6">
        {windowSize.width > 798 && timeSelected && (
          <ConsultationBookingForm
            date={date}
            time={timeSelected}
            isAvailable={isAvailable}
          ></ConsultationBookingForm>
        )}

        <Card
          title="Booking Calendar"
          subtitle="Book an consultation with me."
          context="calendar"
          className="calendar-grid-item"
          footer={
            <Unit layout="flex" gap="sm" className="button-group-flex">
              <Link to="/">
                <Button variant="primary">Home</Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline">View Projects</Button>
              </Link>
              <Link to="/calendar">
                <Button variant="outline">Calendar</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Contact Me</Button>
              </Link>
            </Unit>
          }
        >
          <Unit layout="flex" justifyContent="center" alignItems="center">
            <MonthToggle date={date} onChange={toggleMonth}></MonthToggle>
            <Calendar selectDay={selectDay} date={date} />
          </Unit>
          {windowSize.width <= 797 && timeSelected && (
            <ConsultationBookingForm
              date={date}
              time={timeSelected}
              isAvailable={isAvailable}
            ></ConsultationBookingForm>
          )}
        </Card>
        {date.day && (
          <TimeCarousel
            selectTime={selectTime}
            availableTimeslots={availableTimeslots}
          ></TimeCarousel>
        )}
      </Section>
    </Layout>
  );
};

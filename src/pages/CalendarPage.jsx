import React, { useState } from 'react';
import Section from '../components/Section';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Unit from '../components/Unit';
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import TimeCarousel from '../components/TimeCarousel';
import AppointmentDetails from '../components/AppointmentDetails';

export const CalendarPage = () => {
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const context = {
    section: {
      layout: 'grid',
      background: 'bg-dark',
      justifyItems: 'center',
      // padding: 'py-6',
    },

    unit: {
      colSpan: '1',
      rowSpan: '1',
    },
  };

  const selectDay = (day) => {
    setDay((prevDay) => day);
    console.log('Selected day:', day);
  };

  const selectTime = (hour) => {
    setTime((prevTime) => hour);
  };

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
        {day && <AppointmentDetails time={time}></AppointmentDetails>}

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
          <p>Select a day to view available timeslots.</p>
          <Unit layout="flex" justifyContent="center" alignItems="center">
            <Calendar selectDay={selectDay} />
          </Unit>
        </Card>
        {day && <TimeCarousel selectTime={selectTime}></TimeCarousel>}
      </Section>
    </Layout>
  );
};

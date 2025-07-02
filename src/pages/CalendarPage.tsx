import React, { useState } from 'react';

import { useWindowSize } from '../hooks/useWindowSize';

import Section from '../components/Section';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import DropDown from '../components/DropDown/DropDown';

import Button from '../components/Button';
import Unit from '../components/Unit';
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import TimeCarousel from '../components/TimeCarousel';
import ConsultationBookingForm from '../components/ConsultationBookingForm';
import MonthToggle from '../components/MonthToggle';

import { useBookingLogic } from '../hooks/useBookingLogic';

export const CalendarPage = () => {
  const today = new Date();

  const windowSize = useWindowSize();
  const buttonLayout = windowSize.width <= 798 ? 'dropdown-grid' : 'flex';
  const layoutPlacement = windowSize.width <= 440 ? '' : 'center';

  const [navDropDown, setNavDropDown] = useState<boolean>(false);

  const {
    date,
    time,
    timeslotIsAvailable,
    availableTimeslots,
    loading,
    error,
    selectDay,
    selectTime,
    toggleMonth,
  } = useBookingLogic();

  const context = {
    section: {
      layout: 'grid',
      background: 'bg-dark',
      justifyItems: 'center',
    },

    unit: {
      colSpan: '1',
      rowSpan: '1',
      justifyContent: 'center',
    },
  };

  const toggleNavMobile = () => {
    setNavDropDown((prev) => !prev);
    selectTime(null);
  };

  const handleCloseForm = () => {
    selectTime(null);
  };

  return (
    <Layout
      layout="grid"
      spacing="gap-md"
      alignContent="center"
      justifyItems={layoutPlacement}
      background="bg-dark"
      context={context}
    >
      <Section
        id=""
        layout="appointment-grid"
        background=""
        alignContent=""
        alignItems=""
        justifyContent=""
        justifyItems=""
        gap=""
        width=""
        padding="py-6"
      >
        {windowSize.width > 798 && time && date.day && (
          <ConsultationBookingForm
            date={date}
            time={time}
            timeslotIsAvailable={timeslotIsAvailable}
            handleCloseForm={handleCloseForm}
          ></ConsultationBookingForm>
        )}

        <Card
          title="Booking Calendar"
          subtitle="Book an consultation with me."
          context="calendar"
          className="calendar-grid-item"
          footer={
            <Unit layout={buttonLayout} gap="sm" className="button-group-flex">
              {windowSize.width >= 798 && (
                <>
                  <Link to="/">
                    <Button variant="primary">Home</Button>
                  </Link>
                  <Link to="/projects">
                    <Button variant="outline">View Projects</Button>
                  </Link>
                  <Link to="/calendar">
                    <Button variant="outline" onClick={toggleNavMobile}>
                      Calendar
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline">Contact Me</Button>
                  </Link>
                </>
              )}

              {windowSize.width <= 798 && (
                <DropDown
                  navDropDown={navDropDown}
                  toggleNavMobile={toggleNavMobile}
                ></DropDown>
              )}
            </Unit>
          }
        >
          <Unit justifyContent="center" alignItems="center">
            <MonthToggle date={date} onChange={toggleMonth}></MonthToggle>
            <Calendar selectDay={selectDay} date={date} />
          </Unit>
          {windowSize.width <= 797 && time && date.day && (
            <ConsultationBookingForm
              date={date}
              time={time}
              timeslotIsAvailable={timeslotIsAvailable}
              handleCloseForm={handleCloseForm}
            ></ConsultationBookingForm> // use a modal instead.
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

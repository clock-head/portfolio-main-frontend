import React, { useState } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import Layout from '../components/Layout';
import Unit from '../components/Unit';
import DropDown from '../components/DropDown/DropDown';
import { useWindowSize } from '../hooks/useWindowSize';
import { useLocation } from 'react-router-dom';

export const ContactPage = () => {
  const windowSize = useWindowSize();
  const buttonLayout = windowSize.width <= 798 ? 'dropdown-grid' : 'flex';
  const [navDropDown, setNavDropDown] = useState(false);

  const location = useLocation();

  const currentLocation = location.pathname.slice(1);

  const toggleNavMobile = () => {
    setNavDropDown((prev) => !prev);
  };

  const context = {
    section: {
      layout: 'grid',
      background: 'bg-dark',
      justifyItems: 'center',
      gap: 'md',

      // padding: 'py-6',
    },
    unit: {
      colSpan: '1',
      rowSpan: '1',
      justifySelf: 'end',

      background: 'bg-dark',
    },
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
      <Section id="contact" background="bg-dark" padding="py-6" layout="grid">
        <Card
          title="Contact Me"
          subtitle="Let’s work together"
          footer={
            <Unit layout={buttonLayout} gap="sm">
              {windowSize.width >= 798 && (
                <>
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
                </>
              )}

              {windowSize.width <= 798 && (
                <DropDown
                  navDropDown={navDropDown}
                  toggleNavMobile={toggleNavMobile}
                  currentLocation={currentLocation}
                ></DropDown>
              )}
            </Unit>
          }
        >
          <p>
            Email form and other contact info will appear here in the final
            release.
          </p>
        </Card>
      </Section>
    </Layout>
  );
};

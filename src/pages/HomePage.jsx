// Homepage Composition (example)
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Unit from '../components/Unit';
import { LayoutProvider } from '../layout/LayoutProvider';
import { Card } from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import LoginForm from '../components/AuthForm';
import AuthFlow from '../components/AuthFlow';
import DropDown from '../components/DropDown/DropDown';
import { useWindowSize } from '../hooks/useWindowSize';
import { useLocation } from 'react-router-dom';

export const HomePage = () => {
  const location = useLocation();

  const currentLocation = 'home';

  const windowSize = useWindowSize();
  const buttonLayout = windowSize.width <= 798 ? 'dropdown-grid' : 'flex';

  const [navDropDown, setNavDropDown] = useState(false);

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
      background: 'bg-dark',
    },
  };

  return (
    <>
      <Layout
        layout="grid"
        spacing="gap-md"
        background="bg-dark"
        alignContent="center"
        justifyItems="center"
        context={context}
      >
        <Section layout="grid" background="bg-dark">
          <Card
            title="Clockhead Dev"
            subtitle="Turnkey software builds for plug-and-play business solutions"
            className="py-6"
            footer={
              <Unit layout={buttonLayout} gap="sm" justifyContent="left">
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
            <AuthFlow />
            {/* <p>
              This site is a showcase of modular design, built for speed and
              clarity.
            </p> */}
          </Card>
        </Section>
      </Layout>
    </>
  );
};

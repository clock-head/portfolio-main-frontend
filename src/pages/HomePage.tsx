// Homepage Composition (example)
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Unit from '../components/Unit';
import { Card } from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import AuthFlow from '../components/Auth/AuthFlow';
import DropDown from '../components/DropDown/DropDown';
import { useWindowSize } from '../hooks/useWindowSize';
import { useAuth } from '../contexts/AuthProvider/AuthProvider';
import Dashboard from '../components/Dashboard';

export const HomePage = () => {
  const windowSize = useWindowSize();
  const buttonLayout = windowSize.width <= 798 ? 'dropdown-grid' : 'flex';

  const [navDropDown, setNavDropDown] = useState(false);
  const { user, loading, login, logout, isAuthenticated } = useAuth();

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
        <Section
          id=""
          layout="grid"
          background="bg-dark"
          alignContent=""
          alignItems=""
          justifyContent=""
          justifyItems=""
          width=""
          gap=""
          padding=""
        >
          <Card
            title="Clockhead Dev"
            subtitle="Turnkey software builds for plug-and-play business solutions"
            context=""
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
                  ></DropDown>
                )}
              </Unit>
            }
          >
            {!user && <AuthFlow />}
            {user && <Dashboard user={user} />}
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

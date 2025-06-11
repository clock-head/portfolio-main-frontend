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

export const HomePage = () => {
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
  // const [isLogin, setIsLogin] = useState(false);
  // const [isSignup, setIsSignup] = useState(false);

  // const toggleAuthState = (state) => {
  //   setIsLogin((prevState) => !prevState);
  //   setIsSignup((prevState) => !prevState);
  // };

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
              <Unit layout="flex" gap="sm" justifyContent="left">
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

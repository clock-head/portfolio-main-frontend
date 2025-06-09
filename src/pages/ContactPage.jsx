import React from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import Layout from '../components/Layout';
import Unit from '../components/Unit';

export const ContactPage = () => {
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
            <Unit layout="flex" gap="sm">
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
          <p>
            Email form and other contact info will appear here in the final
            release.
          </p>
        </Card>
      </Section>
    </Layout>
  );
};

import React, { useState } from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { Card } from '../components/Card';
import Unit from '../components/Unit';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import DropDown from '../components/DropDown/DropDown';
import { useWindowSize } from '../hooks/useWindowSize';
import { useLocation } from 'react-router-dom';

const categories = [
  {
    title: 'Dental/Medical',
    subtitle: 'dental sites for building trust and online communication.',
    projects: [
      { title: 'BrightSmiles Dental' },
      { title: '100Smiles' },
      { title: 'Noruba Dental' },
    ],
  },
  {
    title: 'Restaurants',
    subtitle: 'restaurant sites for menu browsing and table booking.',
    projects: [{ title: 'Sakura Noodle House' }, { title: 'Urban Bistro' }],
  },
  {
    title: 'Portfolios',
    subtitle:
      'portfolio sites for communicating design and artistic expertise.',
    projects: [{ title: 'Aria Portfolio' }, { title: 'Mika Motion Studio' }],
  },
  {
    title: 'Trade Services',
    subtitle:
      'Business sites for plumbers, electricians, builders and carpenters.',
    projects: [{ title: 'Ace Plumbing' }, { title: 'Green Electric' }],
  },
  {
    title: 'Law/Real Estate',
    subtitle:
      'Business sites for communicating legal and real estate expertise.',
    projects: [{ title: 'Smith & Co. Law' }, { title: 'Urban Realty' }],
  },
  {
    title: 'Pet Groomers/Vets',
    subtitle: 'Business sites for communicating pet care services.',
    projects: [
      { title: 'Paws & Claws Grooming' },
      { title: 'Happy Tails Vet' },
    ],
  },
];

export const ProjectsPage = () => {
  const location = useLocation();
  const currentLocation = location.pathname.slice(1);

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
    },
  };

  return (
    <Layout
      layout="grid"
      spacing="gap-md"
      // positioning="centered"
      alignContent="center"
      justifyItems="center"
      background="bg-dark"
      context={context}
    >
      <Section background="bg-dark" layout="grid">
        <Card
          title="Projects"
          subtitle="Modern UI for online retail and other use-cases"
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
          <Unit layout="flex" justifyContent="center" alignItems="center">
            <Carousel items={categories}></Carousel>
          </Unit>
        </Card>
      </Section>
    </Layout>
  );
};

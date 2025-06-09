import React from 'react';
import Section from './Section';
import Unit from './Unit';
import Button from './Button';
import './ProjectList.css';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      <Section
        layout="grid"
        gap="xsm"
        width="wide"
        background="bg-dark"
        justifyContent="center"
      >
        {projects.map((project, idx) => (
          <Unit
            key={idx}
            layout="flex"
            background="bg-dark"
            justifyContent="center"
            alignItems="center"
            padding="py-6"
          >
            <Button variant="outline">{project.title}</Button>
          </Unit>
        ))}
      </Section>
    </div>
  );
};

export default ProjectList;

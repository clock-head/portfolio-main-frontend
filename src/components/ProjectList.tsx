import React from 'react';
import Section from './Section';
import Unit from './Unit';
import Button from './Button';
import './ProjectList.css';

interface Project {
  title: string;
  // Add other fields here if needed
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="project-list">
      <Section
        layout="grid"
        gap="xsm"
        width="wide"
        background="bg-dark"
        justifyContent="center"
        justifyItems=""
        padding=""
        id=""
        alignContent=""
        alignItems=""
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

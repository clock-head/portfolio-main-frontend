import React, { useState, useEffect } from 'react';
import Unit from './Unit';
import Section from './Section';
import Button from './Button';
import ProjectList from './ProjectList';
import './CarouselItem.css';

interface Project {
  id: string;
  title: string;
}

interface CarouselItemProps {
  item: {
    title: string;
    [key: string]: any;
  };
  projects?: Project[];
  index: number;
  currentIndex: number;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  projects = [],
  index,
  currentIndex,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggle = () => {
    setExpanded((prev) => !prev);
    console.log('toggle', expanded);
  };

  useEffect(() => {
    // Auto-close when currentIndex changes (slide moves away)
    if (index !== currentIndex && expanded) {
      setExpanded(false);
    }
  }, [currentIndex, expanded, index]);

  return (
    <>
      <div
        key={index}
        className={`carousel-item ${
          index === currentIndex ? 'active' : ''
        }`.trim()}
      >
        <Unit layout="flex" justifyContent="center" alignItems="center">
          <Button onClick={toggle} variant="carousel" intent="carousel">
            {item.title}
          </Button>
        </Unit>
        {expanded && <ProjectList projects={projects}></ProjectList>}
      </div>
    </>
  );
};
export default CarouselItem;

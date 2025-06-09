// Carousel.jsx
import React, { useState, useEffect } from 'react';
import './Carousel.css';
import CarouselItem from './CarouselItem';
import Unit from './Unit';

const Carousel = ({ items = [], interval = 9500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            item={item}
            projects={item.projects}
            index={index}
            currentIndex={currentIndex}
          ></CarouselItem>
        ))}
      </div>
      <button className="carousel-btn prev" onClick={prev}>
        &lsaquo;
      </button>
      <button className="carousel-btn next" onClick={next}>
        &rsaquo;
      </button>
    </div>
  );
};

export default Carousel;

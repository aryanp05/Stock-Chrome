import React from 'react';
import bird2 from '../public/goose.gif';

const FlyingGoose = () => {
  return (
    <img
      src={ bird2 } // Adjust the path to your image
      alt="Flying Goose"
      className="fixed top-1/2 pointer-events-none z-[9999] animate-fly"
      style={{ left: '50px' }} // Starting left position; ensure it matches your keyframes
    />
  );
};

export default FlyingGoose;

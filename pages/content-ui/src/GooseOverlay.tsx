import React from 'react';
import './GooseOverlay.css';

const GooseOverlay: React.FC = () => {
  return (
    <img
      src={chrome.runtime.getURL('images/goose.gif')}
      alt="Flying Goose"
      className="goose"
    />
  );
};

export default GooseOverlay;

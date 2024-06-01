import React, { useState, useEffect } from 'react';
import './styles/Owl.scss';
import mouthImage from './assets/images/mouth.png';
import eyeImage from './assets/images/eye.png';

const Owl = ({ targetX, targetY, currentInsectPosition }) => {
  const [eyePosition, setEyePosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const calculateEyePosition = () => {
      const owlElement = document.querySelector('.owl-container');
      if (owlElement && currentInsectPosition) {
        const rect = owlElement.getBoundingClientRect();
        const eyesCenterX = rect.left + rect.width / 2;
        const eyesCenterY = rect.top + rect.height / 2;
        const deltaX = currentInsectPosition.x - eyesCenterX;
        const deltaY = currentInsectPosition.y - eyesCenterY;
        const maxEyeMovement = 10;
        const left = Math.min(Math.max(deltaX / 20, -maxEyeMovement), maxEyeMovement);
        const top = Math.min(Math.max(deltaY / 20, -maxEyeMovement), maxEyeMovement);
        setEyePosition({ left, top });
      }
    };

    calculateEyePosition();
  }, [targetX, targetY, currentInsectPosition]);

  return (
    <div className="owl-container">
      <img src={mouthImage} alt="Owl Mouth" className="owl-mouth" />
      <div className="owl-eyes">
        <img src={eyeImage} alt="Owl Eye" className="owl-eye left-eye" style={{ transform: `translate(${eyePosition.left}px, ${eyePosition.top}px)` }} />
        <img src={eyeImage} alt="Owl Eye" className="owl-eye right-eye" style={{ transform: `translate(${eyePosition.left}px, ${eyePosition.top}px)` }} />
      </div>
    </div>
  );
};

export default Owl;

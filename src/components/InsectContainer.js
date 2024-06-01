import React, { useState, useEffect } from 'react';
import Insect from './Insect';
import Owl from './Owl';
import Navbar from './Navbar';
import beetle from './assets/images/beetle.png';
import ant from './assets/images/ant.png';
import wasp from './assets/images/wasp.png';

import left from './assets/images/left.png';
import right from './assets/images/right.png';
import './styles/InsectContainer.scss';

const InsectContainer = () => {
  const [insects, setInsects] = useState([]);
  const [currentInsectIndex, setCurrentInsectIndex] = useState(null);
  const [owlPosition, setOwlPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const owlMouthPosition = { x: owlPosition.x, y: owlPosition.y + 50 };
  const thresholdDistance = 50;
  const [bouncingInsectIndex, setBouncingInsectIndex] = useState(null);

  const handleMouseMove = (event) => {
    if (currentInsectIndex !== null) {
      const updatedInsects = [...insects];
      updatedInsects[currentInsectIndex] = { ...updatedInsects[currentInsectIndex], position: { x: event.clientX, y: event.clientY } };
      setInsects(updatedInsects);
      setOwlPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    if (currentInsectIndex !== null) {
      checkInsectProximity(currentInsectIndex);
    }
    setCurrentInsectIndex(null);
  };

  const getRandomPosition = () => {
    const maxX = screenWidth - 100;
    const maxY = screenHeight - 100;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    return { x, y };
  };

  const handleInsectSelection = (type) => {
    const position = getRandomPosition();
    setInsects([...insects, { type, position }]);
    setTargetPosition(position);
  };

  const owlMouthRadius = 50;

  const checkInsectProximity = (index) => {
    const insect = insects[index];
    const insectX = insect.position.x;
    const insectY = insect.position.y;
  

    const distance = Math.sqrt(Math.pow(insectX - owlMouthPosition.x, 2) + Math.pow(insectY - owlMouthPosition.y, 2));
  
    if (distance <= owlMouthRadius) {
      setBouncingInsectIndex(index);
      setTimeout(() => {
        setInsects((prevInsects) => prevInsects.filter((_, i) => i !== index));
        setBouncingInsectIndex(null);
      }, 500);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentInsectIndex, insects]);

  return (
    <div className="insect-container" onMouseMove={handleMouseMove}>
      <Navbar />
      <div className="insect-options">
        <button onClick={() => handleInsectSelection('beetle')}>
          <img src={beetle} alt="Beetle" />
          Beetle
        </button>
        <button onClick={() => handleInsectSelection('ant')}>
          <img src={ant} alt="Ant" />
          Ant
        </button>
        <button onClick={() => handleInsectSelection('wasp')}>
          <img src={wasp} alt="Wasp" />
          Wasp
        </button>
       
      </div>
      {insects.map((insect, index) => (
        <Insect
          key={index}
          type={insect.type}
          position={insect.position}
          onMouseDown={() => setCurrentInsectIndex(index)}
          isBouncing={index === bouncingInsectIndex}
          owlMouthPosition={owlMouthPosition}
          thresholdDistance={thresholdDistance}
          onInsectDrop={() => setBouncingInsectIndex(index)}
        />
      ))}
      <Owl targetX={targetPosition.x} targetY={targetPosition.y} currentInsectPosition={insects[currentInsectIndex]?.position} />
      <div className="arrow">
        <button>
          <img src={left} alt="Left Arrow" />
          Back
        </button>
        <button>
          <img src={right} alt="Right Arrow" />
          Next
        </button>
      </div>
    </div>
  );
};

export default InsectContainer;

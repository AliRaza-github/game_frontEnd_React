import React from 'react';
import './styles/Insect.scss';

const Insect = ({ type, position, onMouseDown, isBouncing }) => {
  const getImage = () => {
    switch (type) {
      case 'beetle':
        return require('./assets/images/beetle.png');
      case 'wasp':
        return require('./assets/images/wasp.png');
      case 'ant':
        return require('./assets/images/ant.png');
     
      default:
        return '';
    }
  };

  return (
    <div
      className={`insect ${type} ${isBouncing ? 'bounce' : ''}`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={onMouseDown}
    >
      <img src={getImage()} alt={type} className='insect-img' />
    </div>
  );
};

export default Insect;

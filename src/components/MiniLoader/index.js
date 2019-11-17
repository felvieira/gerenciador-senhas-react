import React from 'react';
import './style.css';

const MiniLoader = ({ text, size, inverse, wrapperClass }) => (
  <div className={`${wrapperClass}`}>
    <div className={`loading ${size} ${inverse}`}>
      <div className="loader-spinner" />
      {text && <h4 className="text">{text}</h4>}
    </div>
  </div>
);

MiniLoader.defaultProps = {
  size: 'medium',
  text: null,
  inverse: '',
  wrapperClass: '',
};

export default MiniLoader;

import React from 'react';
import ReactDOM from 'react-dom';

const Icon = ({ type, className, style }) => (
  <span className={className ? `icon ${className}` : 'icon'} style={style}>
    <i className={`fa fa-${type}`} />
  </span>
);

Icon.defaultProps = {
  style: {}
};

export default Icon;

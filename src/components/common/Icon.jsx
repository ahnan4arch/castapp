import React from 'react';
import ReactDOM from 'react-dom';

const Icon = (props) => (
  <span
    {...props}
    className={props.className ? `icon ${props.className}` : 'icon'}
    style={props.style}
  >
    <i className={`fa fa-${props.type}`} />
  </span>
);

Icon.defaultProps = {
  style: {}
};

export default Icon;

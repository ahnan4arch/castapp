import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './common/Icon';

const Title = () => (
  <h1
    className="title"
    style={{
      padding: '1rem',
      marginBottom: 0,
    }}
  >
    Devices
  </h1>
);

const DeviceIcon = (props) => (
  <Icon
    {...props}
    type="tv"
    style={{
      fontSize: 32,
      width: 64,
      height: 64,
      background: 'hsl(0, 0%, 96%)',
      color: 'hsl(217, 71%, 53%)',
      borderRadius: 32,
      cursor: 'pointer',
    }}
  />
);

const PageDeviceSelect = ({ devices, file, onCancel, onSelectDevice }) => (
  <div>
    <Title />
    <a href="#" style={{ paddingLeft: '1rem' }} onClick={onCancel}>cancel</a>
    <div style={{ paddingTop: '1rem', marginBottom: '1rem' }}>
      {devices.map((device) => (
        <article className="media" key={device.name} style={{
          marginLeft: '1rem',
          marginRight: '1rem',
        }}>
          <figure className="media-left">
            <p className="image is-64x64">
              <DeviceIcon onClick={() => onSelectDevice(device)} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <strong>{device.name}</strong>
              <br />
              <small>type:{device.type}</small>
              <br />
              <small>host:{device.host}</small>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default PageDeviceSelect;

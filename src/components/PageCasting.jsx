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
    Casting
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
    }}
  />
);

const PlayIcon = (props) => (
  <Icon
    {...props}
    type="play"
    style={{
      fontSize: 32,
      width: 64,
      height: 64,
      background: 'hsl(0, 0%, 96%)',
      color: 'hsl(217, 71%, 53%)',
      borderRadius: 32,
    }}
  />
);

const PageCasting = ({ device, file, onCancel }) => (
  <div>
    <Title />
    <a href="#" style={{ paddingLeft: '1rem' }} onClick={onCancel}>cancel</a>
    <div style={{ paddingTop: '1rem', marginBottom: '1rem' }}>
      <article className="media" key={device.name} style={{
        marginLeft: '1rem',
        marginRight: '1rem',
      }}>
        <figure className="media-left">
          <p className="image is-64x64">
            <DeviceIcon />
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
      <article className="media" key={file.path} style={{
        marginLeft: '1rem',
        marginRight: '1rem',
      }}>
        <figure className="media-left">
          <p className="image is-64x64">
            <PlayIcon />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <div>
              <strong>{file.basename}</strong>
            </div>
            <div>{file.size()} Byte</div>
          </div>
        </div>
      </article>
    </div>
  </div>
);

export default PageCasting;

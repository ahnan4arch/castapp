import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './common/Icon';

const WindowFiles = ({ selectedFile, files, onCastFile, onSelectFile }) => (
  <div style={{ paddingTop: '1rem', marginBottom: '1rem' }}>
    {files.map((file) => (
      <article class="media" key={file.path} style={{
        marginLeft: '1rem',
        marginRight: '1rem',
      }}>
        <figure class="media-left">
          <p class="image is-64x64">
            <Icon type="folder" style={{
              fontSize: 32,
              width: 64,
              height: 64,
              background: '#ddd',
              color: '#fff',
              borderRadius: 32,
            }} />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <div>
              <strong>{file.basename}</strong>
            </div>
            <div>{file.size()} Byte</div>
          </div>
          <nav class="level">
            <div class="level-left">
              <a class="level-item">
                <Icon type="reply" className="is-small" />
              </a>
              <a class="level-item">
                <Icon type="retweet" className="is-small" />
              </a>
              <a class="level-item">
                <Icon type="heart" className="is-small" />
              </a>
            </div>
          </nav>
        </div>
        <div class="media-right">
          <a href="#">
            <Icon type="heart" className="is-small" />
          </a>
        </div>
      </article>
    ))}
  </div>
);

export default WindowFiles;

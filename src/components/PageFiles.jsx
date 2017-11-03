import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './common/Icon';

const Breadcrumb = ({ parents, onOpenDirectory }) => (
  <nav
    className="breadcrumb has-succeeds-separator"
    style={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      marginBottom: 0
    }}
  >
    <ul>
      {parents.map((dir) => (
        <li key={dir.path}>
          <a href="#" onClick={() => onOpenDirectory(dir)}>{dir.path}</a>
        </li>
      ))}
    </ul>
  </nav>
);

const Title = () => (
  <h1
    className="title"
    style={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      marginBottom: 0,
    }}
  >
    Files
  </h1>
);

const RefreshIcon = (props) => (
  <Icon
    {...props}
    type="refresh"
    style={{
      marginRight: '1rem',
      color: 'hsl(217, 71%, 53%)',
      cursor: 'pointer',
    }}
  />
);

const FolderIcon = (props) => (
  <Icon
    {...props}
    type="folder"
    style={{
      fontSize: 32,
      width: 64,
      height: 64,
      background: 'hsl(0, 0%, 96%)',
      color: 'hsl(0, 0%, 21%)',
      borderRadius: 32,
      cursor: 'pointer',
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
      cursor: 'pointer',
    }}
  />
);

const WindowFiles = ({
  directory,
  parents,
  files,
  onRefresh,
  onCastFile,
  onOpenDirectory
}) => {
  if (files.length === 0) {
    return (
      <div>
        <Breadcrumb parents={parents} onOpenDirectory={onOpenDirectory} />
        <Title />
        <div style={{ padding: '1rem 1rem 0 1rem', marginBottom: '1rem' }}>
          <div className="notification">
            Empty files
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb parents={parents} onOpenDirectory={onOpenDirectory} />
      <Title directory={directory} />
      <RefreshIcon
        className="pull-right"
        onClick={onRefresh}
      />
      <div style={{ paddingTop: '1rem', marginBottom: '1rem' }}>
        {files.map((file) => (
          <article className="media" key={file.path} style={{
            marginLeft: '1rem',
            marginRight: '1rem',
          }}>
            <figure className="media-left">
              <p className="image is-64x64">
                {file.isDirectory() ? (
                  <FolderIcon onClick={() => onOpenDirectory(file)} />
                ) : (
                  <PlayIcon onClick={() => onCastFile(file)} />
                )}
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
        ))}
      </div>
    </div>
  );
};

export default WindowFiles;

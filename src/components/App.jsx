import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import CastableFile from '../libs/CastableFile';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      files: []
    };
  }

  componentDidMount() {
    const moviesDir = path.resolve(remote.app.getPath('home'), 'Movies');
    const files = fs.readdirSync(moviesDir)
      .map(_path => path.resolve(moviesDir, _path))
      .map(_path => new CastableFile(_path));
    this.setState({ files });
  }

  render() {
    const { files, selectedFile } = this.state;
    return (
      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <div className="pane-sm sidebar">
              {selectedFile && (
                <div>
                  <ul>
                    <li>{selectedFile.basename}</li>
                    <li>{selectedFile.size()}Byte</li>
                    <li>
                      <button className="btn btn-primary">Cast</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="pane">
              <table className="table-striped">
                <thead>
                  <tr>
                    <th />
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr
                      key={file.path}
                      onClick={() => { this.setState({ selectedFile: file }); }}
                      style={selectedFile === file ? {
                        color: '#fff',
                        backgroundColor: '#116cd6'
                      } : {}}
                    >
                      <td>
                        {file.isDirectory() && (
                          <span className="icon icon-folder" />
                        )}
                      </td>
                      <td>{file.basename}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import PageFiles from './PageFiles';
import PageCasting from './PageCasting';
import File from '../libs/File';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      isCasting: false,
      files: []
    };
  }

  componentDidMount() {
    const moviesDir = path.resolve(remote.app.getPath('home'), 'Movies');
    const files = fs.readdirSync(moviesDir)
      .map(_path => path.resolve(moviesDir, _path))
      .map(_path => new File(_path));
    this.setState({ files });
  }

  render() {
    const { files, selectedFile, isCasting } = this.state;

    if (selectedFile && isCasting) {
      return (
        <PageCasting />
      );
    }

    return (
      <PageFiles
        files={files}
        selectedFile={selectedFile}
        onCastFile={(file) => this.setState({ isCasting: true })}
        onSelectFile={(file) => this.setState({ selectedFile: file })}
      />
    );
  }
}

export default App;

import fs from 'fs';
import path from 'path';
import { remote, ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import PageFiles from './PageFiles';
import PageCasting from './PageCasting';
import File from '../libs/File';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      castingFile: null,
      directory: null,
      parents: [],
      files: []
    };
  }

  componentWillMount() {
    const directory = new File(path.resolve(remote.app.getPath('home'), 'Movies'));
    const parents = directory.parents();
    const files = directory.files();
    this.setState({ directory, parents, files });
  }

  render() {
    const { directory, parents, files, castingFile } = this.state;

    if (castingFile) {
      return (
        <PageCasting file={castingFile} />
      );
    }

    return (
      <PageFiles
        directory={directory}
        parents={parents}
        files={files}
        onCastFile={(file) => {
          ipcRenderer.send('cast-file', JSON.stringify({ path: file.path }));
          this.setState({ castingFile: file });
        }}
        onOpenDirectory={(directory) => {
          const parents = directory.parents();
          const files = directory.files();
          this.setState({ directory, parents, files });
        }}
      />
    );
  }
}

export default App;

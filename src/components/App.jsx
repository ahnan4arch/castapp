import fs from 'fs';
import path from 'path';
import { remote, ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import PageFiles from './PageFiles';
import PageDeviceSelect from './PageDeviceSelect';
import PageCasting from './PageCasting';
import File from '../libs/File';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      directory: null,
      parents: [],
      files: [],
      devices: [],
      castFile: null,
      castDevice: null,
    };

    ipcRenderer.on('devices-update', (event, message) => {
      // device {
      //   "host":"192.168.0.100",
      //   "name":"BRAVIA KJ-40W700C",
      //   "xml":"http://192.168.0.100:52323/dmr.xml",
      //   "type":"upnp"
      // }
      const { devices } = JSON.parse(message);
      this.setState({ devices });
    });
    ipcRenderer.on('cast-stop', (event, message) => {
      this.setState({ castFile: null, castDevice: null });
    });
  }

  componentDidMount() {
    ipcRenderer.send('search-devices');
  }

  componentWillMount() {
    const directory = new File(path.resolve(remote.app.getPath('home'), 'Movies'));
    const parents = directory.parents();
    const files = directory.files();
    this.setState({ directory, parents, files });
  }

  render() {
    const { directory, parents, files, devices, castFile, castDevice } = this.state;

    if (castDevice && castFile) {
      return (
        <PageCasting
          device={castDevice}
          file={castFile}
          onCancel={() => {
            ipcRenderer.send(
              'stop-cast',
              JSON.stringify({ deviceName: castDevice.name })
            );
          }}
        />
      );
    }

    if (castFile) {
      return (
        <PageDeviceSelect
          devices={devices}
          file={castFile}
          onSelectDevice={(device) => {
            this.setState({ castDevice: device }, () => {
              ipcRenderer.send(
                'cast-file',
                JSON.stringify({ filePath: castFile.path, deviceName: device.name })
              );
            });
          }}
          onCancel={() => this.setState({ castFile: null })}
        />
      );
    }

    return (
      <PageFiles
        directory={directory}
        parents={parents}
        files={files}
        onCastFile={(file) => this.setState({ castFile: file })}
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

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 600,
    'min-width': 1024,
    'min-height': 600,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { URL } = require('url');
const http = require('http');
const send = require('send');
const NodeCast = require('nodecast-js');
const ip = require('ip');
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

ipcMain.on('cast-file', (event, arg) => {
  const filePath = JSON.parse(arg).path;
  const dirPath = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const port = random(49152, 65535);

  const server = require('http').createServer((req, res) => {
    send(req, fileName, { root: dirPath }).pipe(res);
  }).listen(port, () => {
    const url = `http://${ip.address()}:${port}`;
    console.log(url);

    const nodeCast = new NodeCast();
    nodeCast.onDevice(device => {
      device.onError(err => {
        console.log(err);
      });
      device.play(url);
    });

    nodeCast.start();
  });
});

const electron = require('electron');
const express = require('express');
const fs = require('fs');
const http = require('http');
const mangaloyaltyClient = require('mangaloyalty-client');
const mangaloyaltyServer = require('mangaloyalty-server');
const packageData = require('../package.json');
const path = require('path');
let mainTray, mainWindow;

function closedWindow() {
  mainWindow = null;
}

function createTray() {
  if (process.platform === 'darwin' || mainTray) return;
  mainTray = new electron.Tray(resourcePath('icon.png'));
  mainTray.on('double-click', createWindow);
  mainTray.setContextMenu(electron.Menu.buildFromTemplate([{click: createWindow, label: 'Launch'}, {type: 'separator'}, {role: 'quit'}]));
  mainTray.setToolTip(`${packageData.name} (${packageData.version})`);
}

function createWindow() {
  if (!mainWindow) {
    mainWindow = new electron.BrowserWindow({width: 800, height: 600, autoHideMenuBar: true, icon: resourcePath('icon.png'), title: `${packageData.name} (${packageData.version})`});
    mainWindow.on('page-title-updated', (ev) => ev.preventDefault());
    mainWindow.loadURL('http://localhost:7783/');
  } else if (mainWindow.isMinimized()) {
    mainWindow.restore();
    mainWindow.focus();
  } else {
    mainWindow.focus();
  }
}

function resourcePath(name) {
  const currentPath = path.join(__dirname, name);
  const resourcePath = path.join(process.resourcesPath, name);
  return fs.existsSync(currentPath) ? currentPath : resourcePath;
}

function startApplication() {
  // Initialize the server router.
  const serverApp = express();
  const server = http.createServer(serverApp);
  mangaloyaltyServer.attachSocket(server);

  // Initialize the server.
  serverApp.disable('x-powered-by');
  serverApp.use(mangaloyaltyClient.router);
  serverApp.use(mangaloyaltyServer.router);
  server.listen(7783, () => {
    if (process.argv.every((arg) => arg !== '--headless')) {
      createTray();
      createWindow();
    } else {
      createTray();
    }
  });
}

if (electron.app.requestSingleInstanceLock()) {
  electron.app.on('activate', createWindow);
  electron.app.on('ready', startApplication);
  electron.app.on('second-instance', createWindow);
  electron.app.on('window-all-closed', closedWindow);
} else {
  electron.app.quit();
}

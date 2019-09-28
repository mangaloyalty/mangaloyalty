const electron = require('electron');
const express = require('express');
const fs = require('fs');
const path = require('path');
let mainTray, mainWindow;

function closeWindow() {
  if (!mainWindow) return;
  mainWindow.close();
  mainWindow = null;
}

function createTray() {
  if (mainTray) return;
  mainTray = new electron.Tray(resourcePath('icon.png'));
  mainTray.on('double-click', createWindow);
  mainTray.setContextMenu(electron.Menu.buildFromTemplate([{click: createWindow, label: 'Launch'}, {type: 'separator'}, {role: 'quit'}]));
  mainTray.setToolTip('MangaLoyalty');
}

function createWindow() {
  if (!mainWindow) {
    mainWindow = new electron.BrowserWindow({width: 800, height: 600, autoHideMenuBar: true, icon: resourcePath('icon.png'), title: 'MangaLoyalty'});
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
  const server = express();
  server.disable('x-powered-by');
  server.use(require('mangaloyalty-client'));
  server.use(require('mangaloyalty-server'));
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
  electron.app.on('window-all-closed', closeWindow);
} else {
  electron.app.quit();
}

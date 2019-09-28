const electron = require('electron');
const express = require('express');
const options = {icon: __dirname + '/node_modules/mangaloyalty-client/public/icons/favicon-32x32.png', title: 'MangaLoyalty'};
const startHeadless = process.argv.some((arg) => arg === '--headless');
let mainTray, mainWindow;

function closeWindow() {
  if (!mainWindow) return;
  mainWindow.close();
  mainWindow = null;
}

function createTray() {
  if (mainTray) return;
  mainTray = new electron.Tray(options.icon);
  mainTray.on('double-click', createWindow);
  mainTray.setContextMenu(electron.Menu.buildFromTemplate([{click: createWindow, label: 'Launch'}, {type: 'separator'}, {role: 'quit'}]));
  mainTray.setToolTip(options.title);
}

function createWindow() {
  if (!mainWindow) {
    mainWindow = new electron.BrowserWindow({width: 800, height: 600, autoHideMenuBar: true, icon: options.icon, title: options.title});
    mainWindow.loadURL('http://localhost:7783/');
  } else if (mainWindow.isMinimized()) {
    mainWindow.restore();
    mainWindow.focus();
  } else {
    mainWindow.focus();
  }
}

function startApplication() {
  const server = express();
  server.disable('x-powered-by');
  server.use(require('mangaloyalty-client'));
  server.use(require('mangaloyalty-server'));
  server.listen(7783, () => {
    if (!startHeadless) {
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

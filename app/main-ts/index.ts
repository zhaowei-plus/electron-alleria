const is = require('electron-is');
import createHomeWindow from './createWindow';
import logger from './logger';
// @ts-ignore
import services from './services';
import { app } from 'electron';

export interface IService {
  getFileFromUser: () => void;
}

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');

const installExtensions = async () => {
  return installExtension(REACT_DEVELOPER_TOOLS);
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  const homeWindow = createHomeWindow();
  // Create the browser window

  return homeWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (is.dev()) {
    await installExtensions();
  }

  logger.info('process', '开始启动项目');
  const homeWindow = createWindow();
  mainWindow = homeWindow;
  (global as any).mainWindow = mainWindow;
  // appMenu(app, windows);
  // appMenu(app, windows);
  //2333
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/**
 * 获取项目
 *
 * @argument
 * @returns
 */

(global as any).services = services;

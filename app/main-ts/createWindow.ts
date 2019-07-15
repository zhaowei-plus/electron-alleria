const { BrowserWindow } = require('electron');
const path = require('path');
import windowUrl from './commonUtils';

const iconPath = path.join(__dirname, '../../build/icons/mac/icon.png');
console.log(iconPath);
export default function createHomeWindow() {
  const homeWindow = new BrowserWindow({
    minWidth:900,
    minHeight: 600,
    width: 900,
    height: 600,
    resizable: true,
    center: true,
    show: true,
    title: 'Alleria',
    fullscreenable: false,
    transparent: false,
    webPreferences: {
      preload: 'on'
    },
    backgroundColor: '#fefefe',
    icon: iconPath
  });

  homeWindow.loadURL(windowUrl);
  return homeWindow;
}

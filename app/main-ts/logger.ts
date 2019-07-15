const electronLog = require('electron-log');

electronLog.transports.file.level = 'info';
electronLog.transports.file.fileName = 'main.log';
electronLog.transports.file.maxSize = 30 * 1024 * 1024;

export default electronLog;

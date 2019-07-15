const { resolve } = require('app-root-path');
// @ts-ignore
const address = require('address');
const is = require('electron-is');

const windowURL = is.dev()
  ? `http://${address.ip()}:8000`
  : `file://${resolve('renderer')}/dist/index.html`;

export default windowURL;

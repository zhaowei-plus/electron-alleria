const { remote, ipcRenderer, shell } = window.require('electron');

export default remote.getGlobal('services');

export const ipc = ipcRenderer;
export const executable = shell;

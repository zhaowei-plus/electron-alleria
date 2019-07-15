/**
 * 向 window 发送消息，并检测是否 destroy
 * @param {BrowserWIndow} win
 * @param {Any} args
 */
module.exports = (win: { isDestroyed: () => boolean; webContents: { send: { apply: (arg0: any, arg1: any[]) => void } } }, ...args: any) => {
  if (win && !win.isDestroyed()) {
    // eslint-disable-next-line
    win.webContents.send.apply(win.webContents, args);
  }
};

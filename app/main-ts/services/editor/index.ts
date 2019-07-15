/* 目前只支持 macOS vscode */
import { spawn } from 'child_process';
import appPath from 'app-path';
import * as Path from 'path';
import * as pathExists from 'path-exists';

function getExecutableShim(installPath: string) {
  return Path.join(installPath, 'Contents', 'Resources', 'app', 'bin', 'code');
}

export default {
  open: async (projectPath: string) => {
    const ids = ['com.microsoft.VSCode', 'com.microsoft.VSCodeInsiders'];
    for (const id of ids) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const installPath = await appPath(id);
        const path = getExecutableShim(installPath);
        // eslint-disable-next-line no-await-in-loop
        const exists = await pathExists(path);
        if (exists) {
          // return path;
          /* 启动 */
          const editorPath = path;
          const editorArgs = [].concat([projectPath]);
          spawn(editorPath, editorArgs);
        }
      } catch (error) {
        error.name = `Unable-to-locate-vsc-installation`;
      }
    }
  }
};

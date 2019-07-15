import { dialog } from 'electron';

import * as fs from 'fs-extra';

// @ts-ignore
const { mainWindow } = global;

console.log(mainWindow, '====');

export default async function getFileFromUser(pathParams) {
  const getProjectDirs = async (path: string) => {
    const targetPath = `${path}/src/routes`;
    const dirs: string[] = await fs.readdir(targetPath);
    return dirs;
  };

  let targetPath = pathParams;

  if(!targetPath){
    const selectedPath = dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      buttonLabel: '打开项目',
      title: '选择项目'
    });

    targetPath = selectedPath[0];
  }

  if (!targetPath) {
    return;
  }
  const dirs: string[] = await getProjectDirs(targetPath);
  const name: string = targetPath.split('/').pop();
  const payload = {
    files: dirs,
    name: name,
    path: targetPath
  };
    // @ts-ignore
    global.mainWindow.webContents.send('project-open', payload);
}

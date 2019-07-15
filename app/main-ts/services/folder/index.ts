import { dialog } from 'electron';
import * as fs from 'fs-extra';
import logger from '../../logger';
const { shell } = require('electron');

// @ts-ignore
const { mainWindow } = global;


const getFolderPath = async ()=>{

  const path = dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    buttonLabel: '选择',
    title: '选择文件夹'
  });

  if (!path) {
    return "";
  }

  // @ts-ignore
  global.mainWindow.webContents.send('folder-selected', path);
  return path;
};
export default {
  /**
   * 在文件夹中打开
   *
   * @param {String} path 文件路径
   */
  open: async (path: string) => {
    await shell.showItemInFolder(path);
  },
  getProjectsInWorkSpace:async  ()=>{
    const res = await  getFolderPath();
    const workSpacePath:string = res[0];
    const dirs: string[] = await fs.readdir(workSpacePath);
    const projects = await dirs.filter( (i: { includes: (arg0: string) => void; })=>{
      const packageJsonPath = `${workSpacePath}/${i}/package.json`;
      return  fs.pathExistsSync(packageJsonPath);
    });


    const projectsInfo =  projects.map( (path)=>{
      const reactPath = `${workSpacePath}/${path}/src/routes`;
      const vuePath = `${workSpacePath}/${path}/src/pages`;
      const pampasPath = `${workSpacePath}/${path}/app/views`;
      const fullPath = `${workSpacePath}/${path}`;

      const getProjectType =  ()=>{
        if(fs.pathExistsSync(reactPath)){
          return 'React';
        }

        if(fs.pathExistsSync(vuePath)){
          return 'Vue'
        }

        if(fs.pathExistsSync(pampasPath)){
          return 'Pampas'
        }

        return 'other'
      }

      const type = getProjectType();


      return {
        path,
        type,
        fullPath,
      }
    })


    logger.info('process', '获取工作区成功');
    // @ts-ignore
    global.mainWindow.webContents.send('workspace-success', {
      projectsInfo,
      workSpacePath
    });
    return projectsInfo;
  }
};

import * as path from 'path';
import * as Home from 'user-home';
import * as copy from 'copy';
import * as fs from 'fs-extra';
import * as exec from 'execa';

export default {
  copy: (projectName: string, type: 'react' | 'vue') => {
    const source = path.resolve(__dirname, '../../scaffolder', type, '**/*');
    const target = path.resolve(`${Home}`, 'zcyWorkSpace', projectName);

    fs.ensureDirSync(target);
    copy(source, target, function(err, files) {
      if (err) console.log(err);
      console.log('项目初始化成功，执行依赖安装');
      const { stdout } = exec.shell('npm install', {
        cwd: target
      });
      stdout.on('data', data => {
        console.log(data.toString());
      });
      stdout.on('close', data => {
        console.log('依赖安装结束, 开始启动项目');
        const { stdout } = exec.shell('npm run dev', {
          cwd: target
        });
        stdout.on('data', data => {
          console.log(data.toString());
        });
        stdout.on('close', data => {
          console.log('项目成功启动');
        });
      });
    });
  }
};

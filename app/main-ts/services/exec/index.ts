import { spawn } from 'child_process';
// import { ipcMain } from 'electron';

export interface IRunOptions {
  cwd: string;
}
/* rt add RouteName --template 1 */
export default {
  run: (cmd: string, argv: string, options: IRunOptions) => {
    const args: Array<string> = argv.split(' ');
    const cp = spawn(cmd, args, {
      cwd: options.cwd
    });
    cp.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });
    cp.on('close', code => {
      console.log(`child process exited with code ${code}`);
    });
  }
};

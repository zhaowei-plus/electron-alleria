const gulp = require('gulp');
const execa = require('execa');
const gutil = require('gulp-util');
const path = require('path');
const spawn = require('cross-spawn');
const shelljs = require('shelljs');

const { colors } = gutil;

const OUTPUTS = {
  out:'out',
  main: 'out/main',
  renderer: 'out/renderer',
};


/**
 * 编译 app
 */
gulp.task('compile:main',(done)=>{
  execa('tsc').then(()=>{
    gutil.log('tsc done')
    done();
  }).catch((e)=>{
    console.log(e);
    done(e);
  })
});



gulp.task('clean:dist',(done)=>{
  shelljs.rm('-rf', ['dist', 'out']);
  gutil.log('移除 ./dist/ ./out/ 文件夹');
  done();
});


gulp.task('mkdir:out',(done)=>{
  shelljs.mkdir(OUTPUTS.out);
  shelljs.mkdir(OUTPUTS.renderer);
  gutil.log('生成 ./out/ 文件夹');
  done();
});


/**
 * 构建内部应用
 */
gulp.task('compile:renderer', (done)=>{
  gutil.log('start compile renderer');
  const ls =  spawn('npm', ['run','build'], {
    stdio: 'inherit',
    cwd:path.join(__dirname,'renderer')
  });

  ls.on('close', (code) => {
    if (code === 0) {
      gutil.log(colors.green('compile:renderer 完成'));
      done(code);
    } else {
      gutil.log(colors.red('compile:renderer 失败'));
      done(code);
    }

  });
});


/**
 * 静态资源拷贝到待打包的文件夹
 */
gulp.task('copy-assests',gulp.series('clean:dist','mkdir:out',(done)=>{
  shelljs.cp('-R', './app/main', './out/main/');
  shelljs.cp('-R', './renderer/dist', './out/renderer/dist/');
  shelljs.cp('./app/yarn.lock', './out/yarn.lock');
  shelljs.cp('./app/package.json', './out/package.json');

  execa('cnpm', ['install'], {
    cwd: path.join(process.cwd(), 'out'),
    stdio: 'inherit',
  }).then(()=>{
    gutil.log(colors.green('out 依赖安装完成'));
    done();
  }).catch((err)=>{
    gutil.log(colors.red('out 依赖安装失败'));
    done(err);
  })
}));



/**
 * 构建electron应用
 */
gulp.task('build',gulp.series('compile:main','compile:renderer','copy-assests',(done)=>{
  execa('electron-builder', [], {
    stdio: 'inherit',
  }).then(()=>{
    gutil.log(colors.green('electron-builder 完成'));
    done();
  }).catch((err)=>{
    gutil.log(colors.red('electron-builder 失败'));
    done(err);
  })
}));

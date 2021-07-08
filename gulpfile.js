const gulp = require('gulp');
const fs = require('fs');
const del = require('del');
const $ = require('gulp-load-plugins')();

// Utility to ignore unnecessary files
// when generating the glob patterns array for gulp.src()
function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!**/REMOVE{,/**}',
    '!node_modules{,/**}',
    '!private{,/**}',
    '!dist{,/**}',
    '!.git{,/**}',
    '!**/.DS_Store'
  ]);
}

// JavaScript and JSON linter
function lintJs () {
  return gulp.src(addDefSrcIgnore(['**/*.js', '**/*.json']), {dot: true})
    .pipe($.eslint({dotfiles: true}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

// Remove solutions from exercises
function removeSolutions () {
  del.sync('dist');
  return gulp.src(addDefSrcIgnore(['**']), {dot: true})
    .pipe($.replace(/^\s*(\/\/|<!--|\/\*)\s*REMOVE-START[\s\S]*?REMOVE-END\s*(\*\/|-->)?\s*$/gm, ''))
    .pipe(gulp.dest('dist'));
}

// Prepare for distribution to students
function updateConfigForSlave (done) {
  let npmConfig = require('./package.json');
  npmConfig.scripts.install = 'npm run install:client && npm run install:server';
  npmConfig.scripts.lint = 'cd client && ng lint';
  npmConfig.scripts['install:client'] = 'if [[ -d "client" && -e "client/package.json" ]]; then cd client && npm i . ; fi;';
  npmConfig.scripts['install:server'] = 'if [[ -d "server" && -e "server/package.json" ]]; then cd server && npm i . ; fi;';
  npmConfig.husky = { 
    'hooks': {
      'pre-commit': 'npm run lint'
    }
  };
  npmConfig = JSON.stringify(npmConfig, null, 2).replace(/-master/g, '');
  fs.writeFileSync('dist/package.json', npmConfig);

  done();
}

// Lint all files
exports.lint = gulp.parallel(
  lintJs,
);


// Prepare for distribution to students
exports.dist = gulp.series(
  removeSolutions,
  updateConfigForSlave
);

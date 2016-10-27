import gulp from 'gulp'
import watchify from 'watchify'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'

import {handleErrors} from './gulpHandleErrors'

const showFileUpdated = (files) => {
  console.log('File(s) updated :');
  files.forEach((file) => {
    console.log('-' + file);
  })
}

gulp.task('watch', () => {
  const watcher = watchify(browserify('./index.js', {
    standalone: 'Queez'
  }));
  return watcher.on('update', (files) => {
    watcher.bundle().on('error', handleErrors)
      .pipe(source('queez.js'))
      .pipe(gulp.dest('./dist'))
    showFileUpdated(files);
  })
  .bundle()
  .pipe(source('queez.js'))
  .pipe(gulp.dest('./dist'));
})

gulp.task('default', ['watch'])

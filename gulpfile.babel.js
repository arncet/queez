import gulp from 'gulp'
import watchify from 'watchify'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import uglify from 'gulp-uglify'
import pump from 'pump'

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
      .pipe(source('index.js'))
      .pipe(gulp.dest('./dist'))
    showFileUpdated(files);
  })
  .bundle()
  .pipe(source('index.js'))
  .pipe(gulp.dest('./dist'));
})

gulp.task('build', () => {
  browserify('./index.js', {
    standalone: 'Queez'
  })
  .bundle()
  .pipe(source('index.js'))
  .pipe(gulp.dest('./dist'));
})


gulp.task('compress', () => {
  pump([
    gulp.src('dist/index.js'),
    uglify(),
    gulp.dest('dist')
  ])
})

gulp.task('default', ['watch'])

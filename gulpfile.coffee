gulp = require 'gulp'
mocha = require 'gulp-mocha'
server = require 'gulp-develop-server'
coffeelint = require 'gulp-coffeelint'
jshint = require 'gulp-jshint'

gulp.task('test', ->
    gulp.src('tests/*.coffee')
        .pipe(mocha())
        .on('error', (err) ->
            @emit('end')
    )
)

gulp.task('watch', ['server:start'], ->
    gulp.watch(
        ['*.coffee', 'model/*.coffee', 'tests/*.coffee', 'public/**/*.js'],
        ['test', 'server:restart', 'lint-coffee', 'lint-js'])
)

gulp.task('server:start', ->
    server.listen({ path: './app.coffee' })
)

gulp.task('server:restart', ->
    server.restart()
)

gulp.task('lint-coffee',  ->
    gulp.src(['app.coffee', 'model/*.coffee'])
        .pipe(coffeelint(
            'indentation': {value: 4}
            'max_line_length': {value: 120}
        ))
        .pipe(coffeelint.reporter())
)

gulp.task('lint-js',  ->
    gulp.src(['public/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('fail'))
)
gulp = require 'gulp'
mocha = require 'gulp-mocha'
server = require 'gulp-develop-server'
coffeelint = require 'gulp-coffeelint'

gulp.task('test', ->
    gulp.src('tests/*.coffee')
        .pipe(mocha())
        .on('error', (err) ->
            @emit('end')
    )
)

gulp.task('watch', ['server:start'], ->
    gulp.watch(['*.coffee', 'model/*.coffee', 'tests/*.coffee'], ['test', 'server:restart', 'lint'])
)

gulp.task('server:start', ->
    server.listen({ path: './app.coffee' })
)

gulp.task('server:restart', ->
    server.restart()
)

gulp.task('lint',  ->
    gulp.src(['app.coffee', 'model/*.coffee'])
        .pipe(coffeelint(
            'indentation': {value: 4}
            'max_line_length': {value: 120}
        ))
        .pipe(coffeelint.reporter())
)
gulp = require 'gulp'
mocha = require 'gulp-mocha'
server = require 'gulp-develop-server'

gulp.task('test', ->
    gulp.src('tests/*.coffee')
        .pipe(mocha())
        .on('error', (err) ->
            @emit('end')
    )
)

gulp.task('watch', ['server:start'], ->
    gulp.watch(['*.coffee', 'model/*.coffee', 'tests/*.coffee'], ['test', 'server:restart'])
)

gulp.task('server:start', ->
    server.listen({ path: './app.coffee' })
)

gulp.task('server:restart', ->
    server.restart()
)

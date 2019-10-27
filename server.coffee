express = require 'express'
http = require 'http'
path = require 'path'
logger = require 'morgan'
favicon = require 'serve-favicon'

app = express()

app.use logger('dev')
app.use express.static(path.join(__dirname, 'public'))
app.use favicon(__dirname + '/public/favicon.ico')

server = http.createServer app
server.listen '3000'
require('./model/socket-handler') server

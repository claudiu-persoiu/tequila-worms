var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
server.listen('3000');
require('./model/socket-handler')(server);

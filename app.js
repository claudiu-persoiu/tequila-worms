var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

var server = http.createServer(app);
server.listen('3000');
require('./model/socket-handler')(server);

const express = require('express');
const hbs = require('hbs');

const path = require('path');

// import * as favicon from 'serve-favicon';
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const http = require('http');
const approotdir = require('./approotdir.js');

__dirname = approotdir.approotdir;
const appsupport = require('./appsupport.js');
const { normalizePort, onError, onListening, handle404, basicErrorHandler } = appsupport;

const index = require('./routes/index.js');
const shots = require('./routes/shots.js');

const indexRouter = index.router;
const shotsRouter = shots.router;

const app = express();
module.exports.app = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router function lists
app.use('/', indexRouter);
app.use('/shots', shotsRouter);

// error handlers
// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

const port = normalizePort(process.env.PORT || '3000');
module.exports.port = port;
app.set('port', port);

const server = http.createServer(app);
module.exports.server = server;
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

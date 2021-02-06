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

// Previously this was in appsupport.js. 

const DBG = require('debug');

const debug = DBG('shots:debug');
const dbgerror = DBG('shots:error');

const util = require('util');

const shotsPSQL = require('./models/shots-psql.js')
const { PSQLShotsStore } = shotsPSQL;
PSQLShotsStoreObject = new PSQLShotsStore();

/* 
 * listening for uncaught exceptions on the process object
 * This means an error was thrown but was not caught by a try/catch
 */
process.on('uncaughtException', function(err) {
    console.error(`I've crashed!!! - ${(err.stack || err)}`);
});


async function catchProcessDeath() {
    debug('urk...');
    console.log(PSQLShotsStore);
    await PSQLShotsStoreObject.close();
    await server.close();
    process.exit(0);
}

process.on('SIGTERM', catchProcessDeath);
process.on('SIGINT', catchProcessDeath);
process.on('SIGHUP', catchProcessDeath);
process.on('exit', () => { debug('exiting...'); });

/*
 * Listenign for unhjandled rejections
 * This means a Promise ended in a rejected state, but there was no .catch handler
 */
process.on('unhandledRejection', (reason, p) => {
    console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
});

function normalizePort(val) {

    const port = parseInt(val, 10);
    if (isNaN(port)) {
	return val;
    }
    if (port >= 0) {
	return port;
    }
    return false;
}

function onError(error) {
    
    if (error.syscall !== 'listen') {
	throw error;
    }
    const bind = typeof port === 'string'
	  ? 'Pipe ' + port
	  : 'Port ' + port;
    switch (error.code) {
    case 'EACCES':
	console.error(`${bind} requires elevated privileges`);
	process.exit(1);
	break;
    case 'EADDRINUSE':
	console.error(`${bind} is already in use`);
	process.exit(1);
	break;
    case 'ENOTESSTORE':
	console.error(`Notes data store initialization failure because `, error.error);
	process.exit(1);
	break;
    default:
	throw error;
    }
}

function onListening() {
    const addr = server.address();
    let bind = typeof addr;
    console.log(addr);
    console.log(addr.port);
    if (bind == 'string') {
	bind = 'pipe ' + addr
    } else {
	bind = 'port ' + addr.port;
    }
    console.log(bind);
    console.log(`Listening on ${bind}`);
}


function handle404(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function basicErrorHandler(err, req, res, next) {
    // Defer to built-in error handler if headersSent
    // See: http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
	return next(err)
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ?
	err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
}

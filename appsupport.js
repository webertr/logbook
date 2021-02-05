const DBG = require('debug');

const debug = DBG('shots:debug');
const dbgerror = DBG('shots:error');

const app = require('./app');
const { port } = app;
console.log(port);

/* 
 * listening for uncaught exceptions on the process object
 * This means an error was thrown but was not caught by a try/catch
 */
process.on('uncaughtException', function(err) {
    console.error(`I've crashed!!! - ${(err.stack || err)}`);
});

const util = require('util');

const shotsStore = require('./models/shots-psql.js')
const { PSQLShotsStore } = shotsStore;

async function catchProcessDeath() {
    debug('urk...');
    await PSQLShotsStore.close();
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

module.exports.normalizePort = function normalizePort(val) {

    const port = parseInt(val, 10);
    if (isNaN(port)) {
	return val;
    }
    if (port >= 0) {
	return port;
    }
    return false;
}

module.exports.onError = function onError(error) {
    
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

const { server } = app;

module.exports.onListening = function onListening() {
    const addr = server.address();
    const bind = typeof addr;
    bind === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;
    console.log(`Listening on ${bind}`);
}


module.exports.handle404 = function handle404(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

module.exports.basicErrorHandler = function basicErrorHandler(err, req, res, next) {
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

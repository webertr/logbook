import { port } from './app.js';

/* 
 * listening for uncaught exceptions on the process object
 * This means an error was thrown but was not caught by a try/catch
 */
process.on('uncaughtException', function(err) {
    console.error(`I've crashed!!! - ${(err.stack || err)}`);
});

import * as util from 'util';

/*
 * Listenign for unhjandled rejections
 * This means a Promise ended in a rejected state, but there was no .catch handler
 */
process.on('unhandledRejection', (reason, p) => {
    console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
});

export function normalizePort(val) {

    const port = parseInt(val, 10);
    if (isNaN(port)) {
	return val;
    }
    if (port >= 0) {
	return port;
    }
    return false;
}

export function onError(error) {
    
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

import { server } from './app.js';
export function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
	  ? 'pipe ' + addr
	  : 'port ' + addr.port;
    console.log(`Listening on ${bind}`);
}


export function handle404(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

export function basicErrorHandler(err, req, res, next) {
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

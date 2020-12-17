import restify from 'restify';
import * as util from 'util';
import { SQUser, connectDB, userParams, findOneUser,
createUser, sanitizedUser } from './users-sequelize.mjs';
import DBG from 'debug';

const log = DBG('users:service');
const error = DBG('users:error');
///////////// Set up the REST server

var server = restify.createServer({
    name: "User-Auth-Service",
    version: "0.0.1"
});

server.use(restify.plugins.authorizationParser());
server.use(check);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

server.listen(process.env.PORT, "localhost", function() {
    log(server.name +' listening at '+ server.url);
});

process.on('uncaughtException', function(err) {
    console.error("UNCAUGHT EXCEPTION - "+ (err.stack || err));
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(`UNHANDLED PROMISE REJECTION: ${util.inspect(p)} reason: ${reason}`);
    process.exit(1);
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// mongoose connects to a data, and provdes models once you call mongoose()
var mongoose = require('./config/mongoose'),
    // This is a express.js file that will create the express applicatin when you call it
    // This calls the passport module, and adds it has middle ware to the express application.
    // It appears to add passport.initialize() and passport.session() as middleware
    // passport.initialize() will bootstrap the passport module. passport.session will use
    // the express session to keep track of your passport session
    express = require('./config/express'),
    // This is about defining the authenication strategy. I don't see any passport
    // application launched. I don't know how this is actually connected to the express app
    // Must be some global property? This passport setup will use the 'User' module
    // to authenticate. This calls passport.use() to setup strategiees to use for
    // authentication 
    passport = require('./config/passport');

// Connects to a database, and provides models
var db = mongoose();

// This is a wrapped to create the express application, and do a bunch of other things
// such as add routes
var app = express();

// This doesn't actually launch an passport applicatin. 
var passport = passport();

app.listen(3000);

// This will be used to load and test the express application later
module.exports = app;

console.log('Server running at http://localhost:3000/');

// Apparently you need a "process.exit()" to actually end this process
// It doesn't just finish when it executes the last command. Presumably some of these
// commands are opening up processes or something.

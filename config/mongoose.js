// config.js imports env/development.js, which has environment type variables,
// such as the database name, and secret password.
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {

    mongoose.set('useCreateIndex', true);
    var db = mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true,
					   useFindAndModify: false });

    // These are models for mongoose. These should be unessary eventually
    require('../app/models/user.server.model');
    require('../app/models/article.server.model');
    
    return db;
    
};

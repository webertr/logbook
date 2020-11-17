var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {

    mongoose.set('useCreateIndex', true);
    var db = mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true,
					   useFindAndModify: false });
    
    require('../app/models/user.server.model');
    require('../app/models/article.server.model');
    
    return db;
    
};

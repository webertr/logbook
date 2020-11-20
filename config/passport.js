var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    
    var User = mongoose.model('User');

    // Serialize means translating a data structure into a format that can be stored
    // of transmitted, and reconstructed later e.g. user -> user.id
    passport.serializeUser(function(user, done) {
	done(null, user.id);
    });

    // deserialize is the opposite of this. id -> user.
    passport.deserializeUser(function(id, done) {
	User.findOne({
	    _id: id
	}, '-password -salt', function(err, user) {
	    done(err, user);
	});
    });
    
    require('./strategies/local.js')();
    
};

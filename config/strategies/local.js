var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {

    // Gives a callback to the local strategy to figure out if user is valid
    passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({
	    username: username
	}, function(err, user) {
	    if (err) {
		return done(err);
	    }
	    if (!user) {
		return done(null, false, {
		    message: 'Unknown user'
		});
	    }
	    if (!user.authenticate(password)) {
		return done(null, false, {
		    message: 'Invalid password'
		});
	    }
	    // This means sucess
	    return done(null, user);
	});
    }));
    
};

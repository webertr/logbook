var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    
    firstName: String,
    lastName: String,
    email: String,
    username: {
	type: String,
	trim: true,
	required: true,
	unique: true
    },
    email: {
	type: String,
	index: true,
	match: /.+\@.+\..+/
    },
    password: String,
    created: {
	type: Date,
	default: Date.now
    },
    role: {
	type: String,
	enum: ['Admin', 'Owner', 'User']
    },
    password: {
	type: String,
	validate: [
	    function(password) {
		return password.length >= 6;
	    },
	    'Password should be longer'
	]
    }
    
});


// Custom static methods
UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({ username: new RegExp(username, 'i') }, callback);
};

// Validate 
UserSchema.methods.authenticate = function(password) {
    return this.password === password;
};

mongoose.model('User', UserSchema);

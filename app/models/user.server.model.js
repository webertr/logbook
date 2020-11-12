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

// Pre middle ware
// UserSchema.pre('save', function(next) {
//     if (...) {
// 	next()
//     } else {
// 	next(new Error('An Error Occured'));
//     }
// });

// post middleware
// UserSchema.post('save', function(next) {
//     if(this.isNew) {
// 	console.log('A new user was created.');
//     } else {
// 	console.log('A user updated is details.');
//     }
// });

mongoose.model('User', UserSchema);


// Second schema
var PostSchema = new Schema({
    title: {
	type: String,
	required: true
    },
    content: {
	type: String,
	required: true
    },
    author: {
	type: Schema.ObjectId,
	ref: 'User'
    }
});

mongoose.model('Post', PostSchema);

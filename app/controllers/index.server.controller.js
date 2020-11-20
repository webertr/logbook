exports.render = function(req, res) {
    res.render('index', {
	title: 'Hello World',
	// Encode object to javascript object notation. In house node.js method
	// This is the user object encoded to a JSON
	user: JSON.stringify(req.user)
    });
};

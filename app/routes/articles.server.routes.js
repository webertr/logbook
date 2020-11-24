var users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
    app.route('/api/articles')
	.get(articles.list)
	.post(users.requiresLogin, articles.create);
    app.route('/api/articles/:articleId')
	.get(articles.read)
	.put(users.requiresLogin, articles.hasAuthorization, articles.update)
	.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

    // This will be called before any routes, and will only be called if paramteres defined
    // on app routes. I also think this is only local to this file, which is called later
    // as a require(file)(app)
    app.param('articleId', articles.articleByID);
};

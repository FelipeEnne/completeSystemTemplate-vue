const admin = require('./admin')

module.exports = app => {
   app.post('/signup', app.api.user.save)
   app.post('/signup',app.api.auth.signin);
   app.post('/validateToken',app.api.auth.validateToken);

    app.route('/user')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('user/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .post(app.api.category.getTree);

    app.route('categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    app.route('categories/:id/article')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/article')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.article.save))
        .get(admin(app.api.article.get));

    app.route('article/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))
  
}
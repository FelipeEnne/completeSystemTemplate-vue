module.exports = app => {
    app.route('/user')
        .post(app.api.user.save)
        .get(app.api.user.get);

    app.route('user/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/categories')
        .post(app.api.category.save)
        .get(app.api.category.get);

    app.route('/categories/tree')
        .post(app.api.category.getTree);

    app.route('categories/:id')
        .put(app.api.category.save)
        .get(app.api.category.getById)
        .delete(app.api.category.remove)

    app.route('categories/:id/article')
        .get(app.api.article.getByCategory)

    app.route('/article')
        .post(app.api.article.save)
        .get(app.api.article.get);

    app.route('article/:id')
        .put(app.api.article.save)
        .get(app.api.article.getById)
        .delete(app.api.article.remove)
  
}
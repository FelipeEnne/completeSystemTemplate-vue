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

    app.route('categories/:id')
        .put(app.api.category.save)
        .get(app.api.category.getById)
        .delete(app.api.category.remove)
  
}
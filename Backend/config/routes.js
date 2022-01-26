module.exports = app => {
    app.route('/user')
        .get(app.api.user.save)
}
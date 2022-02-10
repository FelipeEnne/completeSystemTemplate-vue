const bcrypt = require('bcrypt-nodejs');


module.exports = app => {
    const { existsOrError, notExistsOrError, equalOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = {...req.body};
        if(req.params.id) user.id = req.params.id;

        if(!req.originalUrl.startsWith('/users')) user.admin = false;
        if(!req.user || !req.user.admin) user.admin = false;

        try {
            existsOrError(user.name, 'The name is missing');
            existsOrError(user.email,'The email is missing');
            existsOrError(user.password,'The password is missing');
            existsOrError(user.confirmPassword,'The password confimation is missing');
            if(user.password !== user.confirmPassword) throw 'Passwords are different';
            const userFromDB = await app.db('users')
                    .where({email: user.email}).first();
            if(!user.id) {
                notExistsOrError(userFromDB, 'User already registered')
            }
        } catch (msg) {
            return res.status(400).send(msg);
        }

        user.password = encryptPassword(user.password);
        delete user.confirmPassword;
        if(user.id) {
            app.db('users')
                .update(user)
                .where({id: user.id})
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({id: req.params.id})
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'User have articles')

            const rowsUpdated = await app.db('users')
                .update({deleteAt: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'User not found')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}
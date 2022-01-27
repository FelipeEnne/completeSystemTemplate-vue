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

        try {
            existsOrError(user.name, 'The name is missing');
            existsOrError(user.email,'The email is missing');
            existsOrError(user.password,'The password is missing');
            existsOrError(user.confirmPassword,'The password confimation is missing');
            equalOrError(user.password, user.confirmPassword, 'Passwords are different');
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
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({id: req.params.id})
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}
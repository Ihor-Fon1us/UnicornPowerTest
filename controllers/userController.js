const UserService = require('../services/UserService');
const Mapper = require('./mapper');
const { UserNotFoundError, ValidationError } = require('../errors/APIErrors');

module.exports.createUserHandler = async (req, res, next) => {
    try {
        const user = await UserService.create(req.body);
        next();
        const id_type = /^(?:\+38)?(0\d{9})$/.test(user.id) ? "phone" : "email";
        await UserService.update(user._id, { id_type: id_type });

    } catch (error) {
        next(new ValidationError(error.message))
    }
}

module.exports.userVetification = async (req, res, next) => {
    try {
        const user = await UserService.getById(req.body.id);
        user.comparePassword(req.body.password).then((password) => {
            if (password) next();
            else next(new ValidationError("password not correct"));
        });
    } catch (error) {
        next(new UserNotFoundError());
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const user = await UserService.getById(req.body.id);
        if (user) req.body.json = Mapper.UserToAPI(user);
        else next(new UserNotFoundError());
        next();
    } catch (error) {
        next(new UserNotFoundError());
    }
}
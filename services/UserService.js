const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const config = require('../bin/config');
const COST = config.costBcrypt;

class UserService {
    static async getAll() {
        return UserModel.find({}).exec();
    }

    static async getOne(tableId) {
        return UserModel.findById(tableId).exec();
    }

    static async getById(id) {
        return UserModel.findOne({ 'id': id }).exec();
    }

    static async create(data) {
        const newUser = new UserModel(data);
        newUser.password = bcrypt.hashSync(data.password, COST);
        return newUser.save();
    }

    static async update(userId, data) {

        const user = await UserModel.findById(userId);
        if (data.id_type) {
            user.id_type = data.id_type;
        }
        if (data.password) {
            user.password = bcrypt.hashSync(data.password, COST);
        }
        if (data.id) {
            user.id = data.id;
        }
        return user.save();
    }

    static async remove(tableId) {
        return UserModel.findByIdAndRemove(tableId);
    }
    static async removeAll() {
        return UserModel.remove({});
    }
}

module.exports = UserService;
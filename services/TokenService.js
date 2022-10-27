const TokenModel = require('../models/TokenModel');

class TokenService {
    static async getById(id) {
        return TokenModel.findOne({ id: id }).exec();
    }

    static async getByToken(token) {
        return TokenModel.findOne({ token: token }).exec();
    }

    static async create(data) {
        const token = new TokenModel(data);
        return token.save();
    }

    static async removeUserToken(token) {
        return TokenModel.deleteOne({ token: token });
    }

    static async removeAllUserTokens(id) {
        return TokenModel.deleteMany({ id: id });
    }
    static async removeAll() {
        return TokenModel.remove({});
    }
}

module.exports = TokenService;
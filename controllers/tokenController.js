const jsonwebtoken = require('jsonwebtoken');
const config = require('../bin/config');
const TokenService = require('../services/TokenService');
const { TokenError } = require('../errors/APIErrors');

module.exports.getToken = async (req, res, next) => {
  const token = jsonwebtoken.sign({ id: req.body.id, password: req.body.password }, config.costJWT);
  await TokenService.create({ id: req.body.id, token: token });
  res.cookie('accessToken', token, { maxAge: 600000, secure: false, httpOnly: true });
  req.body.json = { success: true }
  next();
}

module.exports.removeToken = async (req, res, next) => {
  try {
    const all = req.query.all || false;
    if (all) {
      await TokenService.removeAllUserTokens(req.body.id);
      req.body.json = { success: true, message: "all tokens removed" };
    } else {
      await TokenService.removeUserToken(req.cookies.accessToken);
      req.body.json = { success: true, message: "token removed" };
    } 
    next();
  } catch (error) {
    next(new TokenError(error))
  }
}

module.exports.tokenVerificationDB = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const t = await TokenService.getByToken(token);
    if (t) {
      req.body.id = t.id;
      next();
    }
    else next(new TokenError("token expired"));
  } catch (error) {
    next(new TokenError("token error"))
  }
}

module.exports.tokenVerificationJWT = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (token) {
      const valid = jsonwebtoken.verify(token, config.costJWT);
      if (valid) {
        next();
      } else next(new TokenError("token no valid"));
    } else next(new TokenError("token expired"));
  } catch (error) {
    next(new TokenError("token error"))
  }
}
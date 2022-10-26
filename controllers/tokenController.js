const jsonwebtoken = require('jsonwebtoken');
const config = require('../bin/config');
const { TokenError } = require('./APIErrors');

module.exports.getToken = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const token = jsonwebtoken.sign({ token: "token" }, config.COST_JWT);
  return res.status(200).cookie('accessToken', token, { maxAge: 600000, secure: false, httpOnly: true }).json({ success: true, token });
}

module.exports.updateToken = (req, res, next) => {

}

module.exports.tokenVerification = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if(token) {
      const valid = jsonwebtoken.verify(token, config.COST_JWT);
      if (valid) {
        next();
      }
    } else next(new TokenError());
  } catch (error) {
    console.log(error)
    next(new TokenError());
  }
}
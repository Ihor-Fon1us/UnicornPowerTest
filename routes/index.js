const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenController = require('../controllers/tokenController');
const writer = require('../middleware/writer');

router.get('/info', tokenController.tokenVerificationJWT, tokenController.tokenVerificationDB, tokenController.getToken, userController.getUser, writer.writer);

router.get('/logout', tokenController.tokenVerificationJWT, tokenController.tokenVerificationDB, tokenController.removeToken, writer.writer);

router.post('/singin', userController.userVetification, tokenController.getToken, writer.writer);

router.post('/singup', userController.createUserHandler, tokenController.getToken, writer.writer);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenController = require('../controllers/tokenController');

router.get('/info', tokenController.tokenVerification, tokenController.updateToken, userController.getUser);

router.get('/logout', (req, res, next) =>  {
  
});

router.post('/singin', (req, res, next) =>  {
  
});

router.post('/singup', userController.createUserHandler);

module.exports = router;

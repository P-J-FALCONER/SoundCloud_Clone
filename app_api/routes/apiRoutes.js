var express = require('express');
var router = express.Router();
var authController = require('../controllers/authCtrl.js')

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/user', authController.getUser);
router.delete('/user', authController.logout);


module.exports = router;

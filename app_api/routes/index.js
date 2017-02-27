var express = require('express');
var router = express.Router();
var authController = require('../controllers/authCtrl.js')
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router;

var express = require('express');
var router = express.Router();
var authController = require('../controllers/authCtrl.js')

router.get('/user', authController.getCurrentUser);
router.delete('/user', authController.logout);

module.exports = router;

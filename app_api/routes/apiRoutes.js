var express = require('express');
var router = express.Router();
var authController = require('../controllers/authCtrl.js')
var contentController = require('../controllers/contentCtrl.js')

router.get('/user', authController.getCurrentUser);
router.delete('/user', authController.logout);

router.post('/audio', contentController.addAudio);

module.exports = router;

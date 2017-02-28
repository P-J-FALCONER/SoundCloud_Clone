var express = require('express');
var router = express.Router();
var authController = require('../controllers/authCtrl.js')
var contentController = require('../controllers/contentCtrl.js')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: __dirname + '../../../app_client/static/audio' });

router.get('/user', authController.getCurrentUser);
router.delete('/user', authController.logout);

router.post('/audio', multipartMiddleware, contentController.addAudio);
router.get('/songs', contentController.getSongs);

module.exports = router;

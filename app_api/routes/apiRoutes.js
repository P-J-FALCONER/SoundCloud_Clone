var express = require('express');
var router = express.Router();
var authController = require('../controllers/authCtrl.js')
var contentController = require('../controllers/contentCtrl.js')
var multipart = require('connect-multiparty');
var path = require('path')
var multipartMiddleware = multipart({ uploadDir: path.join(__dirname, '..', '..', 'app_client', 'static', 'audio') });

router.get('/user', authController.getCurrentUser);
router.delete('/user', authController.logout);

router.post('/audio', multipartMiddleware, contentController.addAudio);
router.get('/songs', contentController.getSongs);
router.get('/allusers', contentController.getAllUsers);
router.get('/user/aggregates', contentController.getAggregates);
router.delete('/user/delete', contentController.deleteUser);
router.patch('/user/follow', contentController.followUser);

module.exports = router;

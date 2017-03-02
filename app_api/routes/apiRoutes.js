var express = require('express');
var router = express.Router();
var authController = require('../controllers/authCtrl.js')
var contentController = require('../controllers/contentCtrl.js')
var multipart = require('connect-multiparty');
var path = require('path')
var multipartMiddleware = multipart({ uploadDir: path.join(__dirname, '..', '..', 'app_client', 'static', 'audio') });

router.get('/user', authController.getCurrentUser);
router.delete('/user', authController.logout);

router.get('/user/following', contentController.getFollowing);
router.post('/audio', multipartMiddleware, contentController.addAudio);
router.get('/songs', contentController.getSongs);
router.get('/allusers', contentController.getAllUsers);
router.get('/user/aggregates', contentController.getAggregates);
router.delete('/user/delete', contentController.deleteUser);
router.patch('/user/follow', contentController.followUser);
router.get('/user/likedsongs', contentController.getUserLikedSongs);
router.get('/user/likedalbums', contentController.getUserLikedAlbums);
router.get('/stream/songs', contentController.getStreamSongs);
router.get('/stream/albums', contentController.getStreamAlbums);
router.patch('/like/song', contentController.likeSong);
router.get('/artist/:id', contentController.getArtist);
router.get('/artist/songs/:id', contentController.getArtistSongs);
router.get('/artist/albums/:id', contentController.getArtistAlbums);
router.post('/comment', contentController.comment);

module.exports = router;

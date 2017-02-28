var User = require('../models/user.js')
var Song = require('../models/song.js')
var fs = require('fs')

function sendJSONResponse(res, status, data){
  res.status(status);
  res.json(data);
}

module.exports.addAudio = function(req, res){
  Song.create({
    artist: req.user._id,
    name: req.body.name,
  }, function(err, song){
    if(err){
      console.log(err);
      sendJSONResponse(res, 400, err)
    } else {
      var filename = req.files.file.path;
      
      var fileArr = filename.split('/');
      fileArr.pop();
      fileArr = fileArr.join('/');

      filename = fileArr + '/' + song._id + '.mp3'

      fs.rename(req.files.file.path, filename, function (writeErr) {
        sendJSONResponse(res, 201, song)
      })
    }
  })
}

module.exports.getSongs = function(req, res){
  Song.find({}, function(err,songs){
    if(err){
      console.log(err);
      sendJSONResponse(res,400,err);
    }else{
      res.json(songs);
    }
  })
}

module.exports.getAllUsers = function(req, res){
  console.log('hey');
  User.find({}, function(err, users){
    if(err){
      console.log(err);
      sendJSONResponse(res,400,err);
    }else{
      res.json(users);
    }
  })
}

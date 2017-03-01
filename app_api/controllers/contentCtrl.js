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
        console.log(writeErr);
      })

      if(req.body.image){
        var split = req.body.image.split(",");
        var ext;

        if(split[0] == 'data:image/png;base64'){
          ext = '.png'
        } else {
          ext = '.jpg'
        }

        if (split.length === 1) {
            image = split[0];
        } else {
            image = split[1];
        }

        fs.writeFile(__dirname + '/../../app_client/static/img/songs' + song._id + ext, image, "base64", function (writeErr) {
          song.image = 'static/img/songs/' + song._id + ext
          song.save(function(err, product){
            sendJSONResponse(res, 201, product);
          })
        })
      }
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
  User.find({}, function(err, users){
    if(err){
      console.log(err);
      sendJSONResponse(res,400,err);
    }else{
      res.json(users);
    }
  })
}

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
    console.log(song._id);
    if(err){
      console.log('song creation err');
      console.log(err);
      sendJSONResponse(res, 400, err)
    } else {
      // Check for MIME type and store it
      var audioExt;
      var fileType = req.files.file.headers['content-type']

      if(fileType == 'audio/mp3' || fileType == 'audio/mpeg'){
        audioExt = '.mp3'
      } else if(fileType == 'audio/ogg'){
        audioExt = '.ogg'
      } else if(fileType == 'audio/wav'){
        audioExt = '.wav'
      } else if(fileType == 'audio/wma'){
        audioExt = '.wma'
      }

      // Change name of file already in audio folder
      var filename = req.files.file.path;
      console.log('req.files.file.path is ', filename);
      var fileArr = filename.split('/');
      fileArr.pop();
      fileArr = fileArr.join('/');
      filename = fileArr + '/' + song._id + audioExt
      console.log('filename is ' + filename);
      fs.rename(req.files.file.path, filename, function (writeErr) {
        console.log('writ err ', writeErr);
      })

      if(req.body.image){
        var split = req.body.image.split(",");
        var ext;

        if(split[0] == 'data:image/png;base64'){
          ext = '.png';
        } else if(split[0] == 'data:image/jpg;base64'){
          ext = '.jpg';
        } else if(split[0] == 'data:image/jpeg;base64'){
          ext = '.jpeg'
        } else if (split[0] == 'data:image/bmp;base64'){
          ext = '.bmp'
        }

        if (split.length === 1) {
            image = split[0];
        } else {
            image = split[1];
        }

        fs.writeFile(__dirname + '/../../app_client/static/img/songs/' + song._id + ext, image, "base64", function (writeErr) {
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
  Song.find({}).populate('artist').exec(function (err, songs) {
    if(err){
      console.log(err);
      sendJSONResponse(res,400,err);
    }else{
      console.log(songs);
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

module.exports.getAggregates = function(req, res){
  console.log('in server');
  console.log(req.user);
  Song.find({artist: req.user})
}
module.exports.deleteUser = function(req, res){
  User.findByIdAndRemove(req.user._id, function(removed){
    res.json(removed)
  })
}
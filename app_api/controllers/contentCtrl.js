var User = require('../models/user.js')
var Song = require('../models/song.js')
var Album = require('../models/album.js')
var fs = require('fs')
var path = require('path')

function sendJSONResponse(res, status, data){
  res.status(status);
  res.json(data);
}

module.exports.addAudio = function(req, res){
  console.log('in server');
  // if(!req.user._id){
  //   sendJSONResponse(res, 400, 'Please log in on our site.')
  // }

  Song.create({
    artist: req.user._id,
    name: req.body.name,
  }, function(err, song){
    if(err){
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
      var fileArr = filename.split('/');
      fileArr.pop();
      fileArr = fileArr.join('/');
      filename = fileArr + '/' + song._id + audioExt
      fs.rename(req.files.file.path, filename, function (writeErr) {
        if(writeErr){
          console.log(writeErr);
        }
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

        fs.writeFile(path.join(__dirname, '/../../app_client/static/img/songs/', song._id + ext), image, "base64", function (writeErr) {
          song.image = 'static/img/songs/' + song._id + ext
          song.save(function(err, song){
            sendJSONResponse(res, 201, song);
          })
        })
      } else {
        sendJSONResponse(res, 200, song)
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
  
  User.find({$and:[{_id:{$nin: req.user.following}}, {_id:{$nin: [req.user._id]}}]}, function(err, users){
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
  var results = {};
  Song.count({artist: req.user._id}, function(err, songcount){
    if(err){
      console.log(err)
    }else{
      results.uploaded_songs = songcount;
      console.log(results);
      Album.count({artist:req.user._id}, function(err, albumcount){
        if(err){
          console.log(err);
        }else{
          results.uploaded_albums = albumcount;
          results.following=req.user.following.length;
          User.count({following:{$all:[req.user._id]}}, function(err, followers){
            if(err){
              console.log(err);
            }else{
              results.followers = followers;
              Song.count({userLikes:{$all:[req.user._id]}}, function(err, song_likes){
                if(err){
                  console.log(err);
                }else{
                  results.song_likes= song_likes;
                  Album.count({userLikes:{$all:[req.user._id]}}, function(err, album_likes){
                    if(err){
                      console.log(err)
                    }else{
                      results.album_likes = album_likes;
                      res.json(results);
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports.deleteUser = function(req, res){
  User.findByIdAndRemove(req.user._id, function(removed){
    res.json(removed)
  })
}

module.exports.followUser = function(req, res){
  console.log('FOLLOWID--',req.body.followid)
  User.update({_id:req.user.id},{ $push: { following: req.body.followid }},function(err, result){
    console.log('error---',err);
    console.log('results---',result)
    res.json(result);
  })
}
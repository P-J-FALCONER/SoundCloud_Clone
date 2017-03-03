var User = require('../models/user.js')
var Song = require('../models/song.js')
var Album = require('../models/album.js')
var Comment = require('../models/comment.js')
var fs = require('fs')
var path = require('path')

function sendJSONResponse(res, status, data){
  res.status(status);
  res.json(data);
}

function assignImage(uploadedImage){
  var image;
  var split = uploadedImage.split(",");
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

  return {
    image: image,
    ext: ext
  }
}

module.exports.addAudio = function(req, res){
  // if(!req.user._id){
  //   sendJSONResponse(res, 400, 'Please log in on our site.')
  // }

  Song.create({
    artist: req.user._id,
    name: req.body.name,
  }, function(err, song){
    console.log(song._id);
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
      console.log(filename);
      fs.rename(req.files.file.path, filename, function (writeErr) {
        if(writeErr){
          console.log(writeErr);
        }
      })

      if(req.body.image){
        // image, ext keys
        var imageObj = assignImage(req.body.image)

        fs.writeFile(path.join(__dirname, '/../../app_client/static/img/songs/', song._id + imageObj.ext), imageObj.image, "base64", function (writeErr) {
          song.image = 'static/img/songs/' + song._id + imageObj.ext
          song.audio = 'static/audio/' + song._id + audioExt
          console.log(song.audio);
          song.save(function(err, song){
            sendJSONResponse(res, 201, song);
          })
        })
      } else {
        song.audio = 'static/audio/' + song._id + audioExt
        console.log(song.audio);
        song.save(function(err, song){
          sendJSONResponse(res, 201, song);
        })
      }
    }
  })
}

module.exports.getSongs = function(req, res){
  Song.find({}).populate('artist').sort('-plays').exec(function (err, songs) {
    if(err){
      console.log(err);
      sendJSONResponse(res,400,err);
    }else{
      res.json(songs);
    }
  })
}

module.exports.getAllUsers = function(req, res){

  User.find({_id:{$nin: req.user.following}}, function(err, users){
    if(err){
      console.log(err);
      sendJSONResponse(res,400,err);
    }else{
      res.json(users);
    }
  })
}

module.exports.getAggregates = function(req, res){
  var results = {};
  Song.count({artist: req.user.id}, function(err, songcount){
    if(err){
      console.log(err)
    }else{
      results.uploaded_songs = songcount;
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

module.exports.updateUserImage = function(req, res){
  User.findOne({_id: req.user._id}, function(err, user){
    if(err){
      console.log(err);
      return sendJSONResponse(res, 400, err)
    }
    if(!user){
      return sendJSONResponse(res, 404, 'No user')
    }
    var imageObj = assignImage(req.body.image)

    var possibleImgPath = path.join(__dirname, '/../../app_client/static/img/users/' + user.id + imageObj.ext)
    fs.exists(possibleImgPath, function(exists) {
      if(exists) {
        console.log('File exists. Deleting now ...');
        fs.unlink(possibleImgPath);
      } else {
        console.log('File not found, so not deleting.');
      }
      var imageObj = assignImage(req.body.image);

      fs.writeFile(path.join(__dirname, '/../../app_client/static/img/users/', user._id + imageObj.ext), imageObj.image, "base64", function (writeErr) {
        user.image = 'static/img/users/' + user._id + imageObj.ext
        user.save(function(err, user){
          sendJSONResponse(res, 201, user);
        })
      })
    })
    user.image = req.body.image
  })
}

module.exports.followUser = function(req, res){
  User.update({_id:req.user._id},{ $push: { following: req.body.followid }},function(err, result){
    console.log('error---',err);
    console.log('results---',result)
    res.json(result);
  })
}

module.exports.getFollowing = function(req, res){
  console.log('hit server');
  User.findOne({_id:req.user._id}).populate('following').exec(function (err, following) {
    if(err){
      console.log(err)
    }else{
      res.json(following);
    }
  })
}

module.exports.getUserLikedSongs = function(req, res){
  Song.find({userLikes:{$all:[req.user._id]}}).populate('artist').exec(function(err, songs){
    if(err){
      console.log(err);
    }else{
      res.json(songs);
    }
  })
}

module.exports.getUserLikedAlbums = function(req, res){
   Album.find({userLikes:{$all:[req.user._id]}}).populate('artist').exec(function(err, albums){
    if(err){
      console.log(err);
    }else{
      res.json(albums);
    }
  })
}

module.exports.getStreamSongs = function(req, res){
  Song.find({artist: {$in:req.user.following}}).populate('artist').exec(function(err, songs){
    if(err){
      console.log(err);
    }else{
      res.json(songs);
    }
  })
}

module.exports.getStreamAlbums = function(req, res){
  Album.find({artist: {$in:req.user.following}}).populate('artist').exec(function(err, albums){
    if(err){
      console.log(err);
    }else{
      res.json(albums);
    }
  })
}

module.exports.likeSong = function(req, res){
  Song.update({_id:req.body.song_id},{ $push: { userLikes: req.user._id}}, function(err, liked_song){
    if(err){
      console.log(err);
    }else{
      res.json(liked_song);
    }
  })
}

module.exports.getArtist = function(req, res){
  User.findOne({_id:req.params.id}, function(err, artist){
    if(err){
      console.log(err);
    }else{
      res.json(artist);
    }
  })
}

module.exports.getArtistSongs = function(req, res){
  Song.find({artist:req.params.id}, function(err, songs){
    if(err){
      console.log(err);
    }else{
      res.json(songs);
    }
  })
}

module.exports.getArtistAlbums = function(req, res){
  Album.find({artist:req.params.id}, function(err, albums){
    if(err){
      console.log(err);
    }else{
      res.json(albums);
    }
  })
}

module.exports.comment = function(req, res){
  console.log('SONG--',req.body.song_id)
  console.log('comment--',req.body.comment)
  console.log('time--',req.body.time)
  console.log('USER----', req.user._id)

    Comment.create({song:req.body.song_id, user:req.user._id, comment:req.body.comment,timeInSong:req.body.time}, function(err, comment){
      if(err){
        console.log(err);
      }else{
        console.log('db response',comment);
        res.json(comment);
      }
    })
}

module.exports.addPlay = function(req, res){
  console.log('in server');
  Song.findOne({_id: req.params.song_id}).populate('artist').exec(function(err, song){
    console.log(song);
    if(err){
      return sendJSONResponse(res, 400, err)
    }
    if(!song){
      return sendJSONResponse(res, 404, 'No song found')
    }
    song.plays += 1;
    song.save(function(err, song){
      if(err){
        console.log(err);
        return sendJSONResponse(res, 400, err)
      }
      sendJSONResponse(res, 200, song)
    })
  })
}

module.exports.getComments = function(req, res){
  Comment.find({}).populate('user').exec(function(err, comments){
    if(err){
      console.log(err);
    }else{
      res.json(comments)
    }
  })
}
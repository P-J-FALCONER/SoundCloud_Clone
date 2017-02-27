var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  userLikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // userReposts: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  image_path: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Album', AlbumSchema)

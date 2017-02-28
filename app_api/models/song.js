var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type:String
  },
  userLikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // userReposts: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  audio_path: {
    type: String,
    required: true
  },
  plays: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', SongSchema)

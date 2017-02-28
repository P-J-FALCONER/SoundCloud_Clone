var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  plays: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', SongSchema)

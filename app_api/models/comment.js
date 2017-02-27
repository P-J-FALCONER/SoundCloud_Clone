var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  song: {
    type: mongoose.Types.ObjectId,
    ref: 'Song'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  },
  timeInSong: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema)

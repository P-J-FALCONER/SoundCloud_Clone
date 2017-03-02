var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  },
  timeInSong: {
    type: Number,
    required: true,
    default:0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema)

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: String,
  local: {
    username: String,
    password: String
  },
  google: {
    token        : String,
    username     : String
  },
  facebook: {
    token        : String,
    username     : String
  },
  // stationLikes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Song'
  // }],
  image: {

  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// UserSchema.path('email').validate(function(value, done) {
//   this.model('User').count({ email: value }, function(err, count) {
//     if (err) {
//         return done(err);
//     }
//     // If `count` is greater than zero, "invalidate"
//     done(!count);
//   });
// }, 'Email already exists');

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
}

UserSchema.methods.hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

module.exports = mongoose.model('User', UserSchema)

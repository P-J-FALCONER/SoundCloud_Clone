var User = require('../models/user.js')

function sendJSONResponse(res, status, data){
  res.status(status);
  res.json(data);
}

module.exports.getCurrentUser = function(req, res){
  if(req.user){
    console.log('found req.user');
    console.log(req.user);
    return sendJSONResponse(res, 200, req.user);
  } else if(req.session.username){
    console.log('found req.session');
    console.log(req.session);
    return sendJSONResponse(res, 200, req.session);
  } else {
    return sendJSONResponse(res, 200, '');
  }
}

module.exports.logout = function(req, res){
  return sendJSONResponse(res, 200, req.logout());
}

module.exports.register = function(req, res){
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    image_path: req.body.image_path
  }, function(err, user){
    if(err){
      sendJSONResponse(res, 400, err)
    } else {
      token = user.generateJwt();
      sendJSONResponse(res, 201, {'token': token})
    }
  })
}

module.exports.login = function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(err || !user){
      sendJSONResponse(res, 401, {'error': 'Authentication failed'})
    } else {
      if(user.passwordCheck(req.body.password)){
        token = user.generateJwt();
        sendJSONResponse(res, 200, {'token': token});
      } else {
        sendJSONResponse(res, 401, {'error': 'Authentication failed'})
      }
    }
  })
}

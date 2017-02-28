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
  } else {
    console.log('couldnt find it');
    return sendJSONResponse(res, 200, '');
  }
}

module.exports.logout = function(req, res){
  return sendJSONResponse(res, 200, req.logout());
}

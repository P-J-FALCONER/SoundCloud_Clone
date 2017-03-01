var User = require('../models/user.js')

function sendJSONResponse(res, status, data){
  res.status(status);
  res.json(data);
}

module.exports.getCurrentUser = function(req, res){
  if(req.user){
    return sendJSONResponse(res, 200, req.user);
  } else {
    return sendJSONResponse(res, 200, '');
  }
}

module.exports.logout = function(req, res){
  return sendJSONResponse(res, 200, req.logout());
}

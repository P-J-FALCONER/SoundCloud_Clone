var User = require('../models/user.js')

function sendJSONResponse(res, status, data){
  res.status(status);
  res.json(data);
}

module.exports.addAudio = function(req, res){
  console.log('in server');
  console.log(req.body);
  req.json({});
}

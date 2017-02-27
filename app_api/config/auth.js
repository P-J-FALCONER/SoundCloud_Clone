module.exports = {
  'googleAuth' : {
      'clientID'      : process.env.CLIENT_ID,
      'clientSecret'  : process.env.CLIENT_SECRET,
      'callbackURL'   : 'http://localhost:8000/auth/google/callback'
  }
};

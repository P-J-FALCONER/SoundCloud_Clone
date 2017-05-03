module.exports = {
  'facebookAuth' : {
    'clientID'      : process.env.FB_CLIENT_ID, // your App ID
    'clientSecret'  : process.env.FB_CLIENT_SECRET, // your App Secret
    'callbackURL'   : 'http://54.172.134.183/auth/facebook/callback'
  },
  'googleAuth' : {
    'clientID'      : process.env.CLIENT_ID,
    'clientSecret'  : process.env.CLIENT_SECRET,
    'callbackURL'   : 'http://54.172.134.183/auth/google/callback'
  }
};

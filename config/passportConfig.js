const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = require('../config/index');
const facebookPassportConfig = () => {
  return passport.use(
    new FacebookStrategy(
      {
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL: `${config.URL_CALLBACK}/auth/google/callback`,
        profileFields: ['id', 'displayName', 'name', 'email'],
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        try {
          if (profile) {
            req.user = profile
            done(null, profile)
          }
        } catch (error) {
          done(error)
        }
      }
    )
  )
}
const googlePassportConfig = () => {
  return passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENTID,
        clientSecret: config.GOOGLE_SECRETID,
        callbackURL: `${config.URL_CALLBACK}/auth/google/callback`,
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        try {
          if (profile) {
            req.user = profile
            done(null, profile)
          }
        } catch (error) {
          done(error)
        }
      }
    )
  )
}

module.exports = {
  facebookPassportConfig,
  googlePassportConfig,
}
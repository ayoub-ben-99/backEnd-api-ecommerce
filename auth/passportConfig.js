const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user');

/**
 * @function GoogleStrategy
 * @desc Configure passport strategy to authenticate users via Google OAuth2
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},

  /**
   * @param {string} accessToken - The access token received from Google.
   * @param {string} refreshToken - The refresh token received from Google.
   * @param {object} profile - The profile information of the user from Google.
   * @param {function} done - The callback function to pass the user object to passport.
   */
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

/**
 * @function serializeUser
 * @desc Serialize user instance to store in session.
 * @param {object} user - The user object to serialize.
 * @param {function} done - The callback function to complete the serialization.
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * @function deserializeUser
 * @desc Deserialize the user from the session by finding it in the database.
 * @param {string} id - The user ID stored in the session.
 * @param {function} done - The callback function to complete the deserialization.
 */
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

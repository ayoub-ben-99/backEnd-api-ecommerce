const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @route GET /auth/google
 * @desc Initiate Google OAuth authentication
 * @access Public
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @route GET /auth/google/callback
 * @desc Google OAuth callback route to handle authentication response
 * @access Public
 */
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true,
  }),
  (req, res) => {
    res.redirect(`http://localhost:3000?token=${req.user._id}`);
  }
);

module.exports = router;

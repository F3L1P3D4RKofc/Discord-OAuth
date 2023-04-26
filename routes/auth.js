const express = require('express');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const config = require('../config');

const router = express.Router();

passport.use(new DiscordStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.redirectURI,
  scope: ['identify', 'email']
}, (accessToken, refreshToken, profile, cb) => {
  // Aqui você pode tratar os dados do usuário que acabou de se autenticar
  console.log(profile);
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;

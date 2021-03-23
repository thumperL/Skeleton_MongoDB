const express = require('express');
const passport = require('passport');
const authController = require('../../controllers/authController');

const router = express.Router();

// Local Strategy Authentication
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.register);
router.get('/login', authController.getLoginPage);
router.post('/login', passport.authenticate('local', {
  failureFlash   : true,
  successFlash   : true,
  successRedirect: '/',
  failureRedirect: '/users/login',
}));
router.get('/logout', authController.logout);

// Facebook Strategy Authentication
// router.get('/facebook', passport.authenticate('facebook', {
//   scope: ['email', 'public_profile'],
// }));
// router.get('/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: '/',
//   failureRedirect: '/users/login',
// }));

// Google Strategy Authentication
// router.get('/google', passport.authenticate('google', {
//   scope: ['profile', 'email'],
// }));
// router.get('/google/callback', passport.authenticate('google', {
//   successRedirect: '/',
//   failureRedirect: '/users/login',
// }));

module.exports = router;

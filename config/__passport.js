const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = (app) => {
  /* Initialise Passport */
  app.use(passport.initialize());
  app.use(passport.session());

  /* Local Strategy */
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered!' });
      }
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return done(null, false, { message: 'Email or Password incorrect.' });
        }
        return done(null, user);
      });
    })
    .catch((err) => done(err, false));
  }));

  /* Facebook Strategy */
  // passport.use(new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_ID,
  //   clientSecret: process.env.FACEBOOK_SECRET,
  //   callbackURL: process.env.FACEBOOK_CALLBACK,
  //   profileFields: ['email', 'displayName'],
  // }, (accessToken, refreshToken, profile, done) => {
  //   const { name, email } = profile._json;
  //   User.findOne({ email })
  //     .then((user) => {
  //       if (user) return done(null, user);
  //       const randomPassword = Math.random().toString(36).slice(-8);
  //       bcrypt
  //         .genSalt(10)
  //         .then((salt) => bcrypt.hash(randomPassword, salt))
  //         .then((hash) => User.create({
  //           name,
  //           email,
  //           password: hash,
  //         }))
  //         .then((user) => done(null, user))
  //         .catch((err) => done(err, false));
  //     });
  // }));

  /* Google Strategy */
  // passport.use(new GoogleStrategy({
  //   clientID    : process.env.GOOGLE_ID,
  //   clientSecret: process.env.GOOGLE_SECRET,
  //   callbackURL : process.env.GOOGLE_CALLBACK,
  // }, ((req, accessToken, refreshToken, profile, done) => {
  //   const { name, email, email_verified } = profile._json;
  //   if (email_verified === false) return done(null, false, req.flash('error_messages', 'Email or password incorrect!'));

  //   User.findOne({ email })
  //   .then((user) => {
  //     if (user) return done(null, user);
  //     const randomPassword = Math.random().toString(36).slice(-8);
  //     bcrypt
  //     .genSalt(10)
  //     .then((salt) => bcrypt.hash(randomPassword, salt))
  //     .then((hash) => User.create({
  //       name,
  //       email,
  //       password: hash,
  //     }))
  //     .then((user) => done(null, user))
  //     .catch((err) => done(err, false));
  //   });
  // })));

  /* serialize and deserialize user */
  passport.serializeUser((user, cb) => {
    if (user !== false) return cb(null, user.id);
    return cb(null);
  });
  passport.deserializeUser((id, cb) => {
    User.findById(id)
    .lean()
    .then((user) => cb(null, user))
    .catch((err) => cb(err, null));
  });
};

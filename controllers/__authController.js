const bcrypt = require('bcryptjs');
const User = require('../models/user');

const authController = {
  getRegisterPage: (req, res, next) => {
    (async () => {
      res.render('userManagement/register');
    })()
    .catch(next);
  },
  register: (req, res, next) => {
    (async () => {
      const {
        name, email, password, confirmPassword,
      } = req.body;
      // All fields required
      if (!name || !email || !password || !confirmPassword) {
        return res.render('userManagement/register', { name, email, error_messages: 'All fields are required!' });
      }
      // Confirm password
      if (password !== confirmPassword) {
        return res.render('userManagement/register', { name, email, error_messages: 'Password does not match!' });
      }
      // Uniqueness
      return User
      .findOne({ email })
      .then((user) => {
        if (user) {
          return res.render('userManagement/register', { name, email, error_messages: 'Email has been registered before, please use another email!' });
        }
        return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        }))
        .then(() => res.redirect('/'))
        .catch((err) => next(console.error(err)));
      });
    })()
    .catch(next);
  },

  getLoginPage: (req, res, next) => {
    (async () => res.render('userManagement/login'))()
    .catch(next);
  },

  logout: (req, res, next) => {
    (async () => {
      req.logout();
      req.flash('success_messages', 'Logout successful!');
      res.redirect('/users/login');
    })()
    .catch(next);
  },
};

module.exports = authController;

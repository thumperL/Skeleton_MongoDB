module.exports = {
  getUser      : (req, res, next) => req.user,
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('warning_messages', 'Please login first！');
    return res.redirect('/users/login');
  },
  authenticatedAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (module.exports.getUser(req).isAdmin) { return next(); }
      return res.redirect('/');
    }
    req.flash('warning_messages', 'Please login first！');
    return res.redirect('/users/login');
  },
};

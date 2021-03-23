const User = require('../../models/user');

const adminController = {
  /* * * * * *
   *  Admin  *
   * * * * * */
  // Create
  // Read
  getUsers: (req, res, next) => {
    User
    .find()
    .lean()
    .then((users) => {
      res.render('admin/users', { users });
    })
    .catch((error) => next(error));
  },
  // Update
  toggleAdmin: (req, res, next) => {
    (async () => {
      User
      .findById(req.params.id)
      .then((user) => {
        user.update({
          isAdmin: user.isAdmin !== true,
        })
        .then((user) => {
          req.flash('success_messages', 'User was updated successfully');
          res.redirect('/admin/users');
        });
      });
    })()
    .catch((error) => next(error));
  },
  // Delete
  deleteUser: (req, res, next) => {
    User
    .deleteOne({ _id: req.params.id })
    .then((user) => {
      req.flash('success_messages', 'User was deleted successfully');
      res.redirect('/admin/users');
    })
    .catch((error) => next(error));
  },
};

module.exports = adminController;

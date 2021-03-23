const express = require('express');

const adminController = require('../../controllers/admin/adminController');

const router = express.Router();
router.get('/', (req, res) => res.redirect('/admin/users')); // Main dashboard currently redirects to user management
router.get('/users', adminController.getUsers);
router.put('/users/:id/toggleAdmin', adminController.toggleAdmin);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;

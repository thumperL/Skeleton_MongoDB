const express = require('express');

const router = express.Router();

/* Authentication Helper */
// const { authenticated, authenticatedAdmin } = require('../middleware/authHelper');

/* Modular Routes */
const frontend = require('./modules/frontend');
// const users = require('./modules/users');
// const admin = require('./modules/admin');

/* Routes Lists */
// router.use('/users', users);
// router.use('/admin', authenticatedAdmin, admin);
router.use('/', /* authenticated, */ frontend);

module.exports = router;

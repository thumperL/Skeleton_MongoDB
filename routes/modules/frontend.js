const express = require('express');

const router = express.Router();

/* Controllers */
const frontendController = require('../../controllers/frontend/frontendController');

/* Route List */
router.get('/', frontendController.getIndexPage);

module.exports = router;

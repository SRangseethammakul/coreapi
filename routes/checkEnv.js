const express = require('express');
const router = express.Router();
const checkEnvController = require('../controllers/checkEnvController');

router.post('/', checkEnvController.index);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const productController = require('../controllers/productController');

router.get('/', productController.index);

module.exports = router;

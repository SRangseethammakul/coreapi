const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const productController = require('../controllers/productController');

router.get('/', productController.index);
router.post('/create/type', productController.insertType);
router.post('/insertProduct', productController.insertProduct);
router.get('/product', productController.getProduct);
router.get('/product/:id', productController.getProductWithProduct);

module.exports = router;

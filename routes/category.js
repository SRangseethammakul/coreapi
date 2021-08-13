const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.index);
router.get('/:id', categoryController.getShopWithMenu);
router.post('/create', categoryController.insert);

module.exports = router;

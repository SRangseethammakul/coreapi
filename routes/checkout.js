const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const passportJWT = require('../middleware/passportJWT');


router.post('/creditcard', checkoutController.index);
router.post('/internetbangking', checkoutController.internetBanking);
router.post('/webhooks', checkoutController.omiseWebHooks);
router.get('/bank-charge', checkoutController.getInternetBankingCharge);

module.exports = router;

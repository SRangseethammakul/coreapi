const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', userController.login);
router.post('/register', [
  body('name').not().isEmpty().withMessage('please insert name'),
  body('email').not().isEmpty().withMessage('please insert email').isEmail().withMessage('email format invalid'),
  body('password').not().isEmpty().withMessage('please insert password').isLength({min:8}).withMessage('password length 8')
], userController.register);
router.get('/profile', [passportJWT.isLogin], userController.profile);

module.exports = router;

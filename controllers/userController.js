const User = require('../models/user');
const {
  validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
exports.login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    //check email exist system
    const user = await User.findOne({
      email: email
    });
    if (!user) {
      const error = new Error('not found user');
      error.statusCode = 404;
      throw error;
    }
    // compare password ถ้าไม่ตรง Return false
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error('password invalid');
      error.statusCode = 401;
      throw error;
    }

    //create token
    const token = await jwt.sign({
      id: user._id,
      role: user.role
    }, config.JWT_SECRET, {
      expiresIn: '2 days'
    });

    //decode expiresIn
    const expires_in = jwt.decode(token);
    return res.status(200).json({
      message: "login success",
      access_token: token,
      expires_in: expires_in.exp,
      token_type: 'Bearer'
    });
    
  } catch (error) {
    next(error);
  }
}
exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('format invalid');
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    //check email
    const existEmail = await User.findOne({
      email: email
    });
    if (existEmail) {
      const error = new Error('email repeat');
      error.statusCode = 400;
      throw error;
    }
    let user = new User();
    user.name = name;
    user.email = email;
    user.provider = 'emailAuth';
    user.password = await user.encryPassword(password);
    await user.save();
    return res.status(201).json({
      message: "registed"
    });
  } catch (error) {
    next(error);
  }
}
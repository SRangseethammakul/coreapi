const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
exports.googleAuth = async (req, res) => {
    const {
      id,
      displayName,
      emails: [{ value }],
    } = req.user;
    try {
      // Find user in the database
      const user = await User.findOne({ provider_id: id })
      let token;

      if (!user) {
        // User not found --> new user --> create new user in the database
        const newUser = await User.create({
          name: displayName,
          email: value,
          password: `google_${id}`,
          provider_id: id,
          provider : 'google'
        });
      //create token
        token = await jwt.sign({
          id: newUser._id,
          role: newUser.role
        }, config.JWT_SECRET, {
          expiresIn: '2 days'
        });
      } else {
        //create token
        token = await jwt.sign({
          id: user._id,
          role: user.role
        }, config.JWT_SECRET, {
          expiresIn: '2 days'
        });
      }
      //decode expiresIn
      // const expires_in = jwt.decode(token);
      res.cookie('access_token', token);
      res.redirect(config.URL_REDIRECT);
    } catch (error) {
      res.redirect(config.URL_REDIRECT)
    }
  }
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require('passport');
const mongoose = require("mongoose");
const config = require("./config/index");
const cors = require("cors");

const {
  facebookPassportConfig,
  googlePassportConfig
} = require('./config/passportConfig');
const { googleAuth } = require('./utils/socialProvidersAuth');
// facebookPassportConfig();
googlePassportConfig();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const checkoutRouter = require("./routes/checkout");
const productRouter = require("./routes/product");

//import middleware
const errorHandler = require('./middleware/errorHandler');
const passportJWT = require('./middleware/passportJWT');

const app = express();
app.use(cors({ origin: config.URL_REDIRECT, credentials: true }));
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/checkout", checkoutRouter);
app.use("/product", productRouter);
app.use(errorHandler);

// social login
app.get('/auth/facebook',
  passport.authenticate('facebook'));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    const user = req.user;
    // Handle user with database --> new user (sign up --> create new user) / signin
    // Send jwt token back to frontend --> response / res.cookies

    res.redirect('http://localhost:3000')
  }
)

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile','email']
}));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: config.URL_REDIRECT,
  }),
  googleAuth
);
// end social login

module.exports = app;

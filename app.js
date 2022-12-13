/* eslint-disable no-console */
const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { default: mongoose } = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');

const {
  health,
  purchaseReason,
  brand,
  origin,
  product,
  shop,
  user,
} = require('./src/routes');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.URI)
  .then(() => console.log('Database connected 🤙'))
  .catch((err) => console.log(err));

const initPassport = require('./src/passport/init');

initPassport(passport);

const auth = require('./src/routes/auth')(passport);

app.use('/', health);
app.use('/api/v1/purchase-reason', purchaseReason);
app.use('/api/v1/brand', brand);
app.use('/api/v1/origin', origin);
app.use('/api/v1/product', product);
app.use('/api/v1/shop', shop);
app.use('/api/v1/user', user);
app.use('/api/v1', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;

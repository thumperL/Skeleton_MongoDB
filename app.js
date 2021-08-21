/* Config ENV */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

/* [OPTIONAL] */
// const session = require('express-session');
// const flash = require('connect-flash');
// const usePassport = require('./config/passport');
/* [OPTIONAL] */

const routes = require('./routes');
require('./config/mongoose');

const app = express();
app.use(helmet());

/* View engine setup */
app.engine('hbs', expressHandlebars({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
/* [[OPTIONAL - passport login]] */
// app.use(session({
//   secret           : process.env.SESSION_SECRET,
//   resave           : false,
//   saveUninitialized: true,
// }));
// usePassport(app);
// app.use(flash());
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated();
//   res.locals.user = req.user;
//   res.locals.success_messages = req.flash('success_messages');
//   res.locals.error_messages = req.flash('error_messages');

//   next();
// });
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { errorStatus: (err.status || 500), errorStack: err.stack });
});

module.exports = app;

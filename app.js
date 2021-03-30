console.log('market-1')
const createError = require('http-errors');
console.log('market0')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Conexión Base de datos
require('./dbConfig')();

console.log('market1')



const indexRouter = require('./routes/index');
console.log('market2')
const usersRouter = require('./routes/users');
console.log('market3')
const tripsRouter = require('./routes/trips');
console.log('market4')
const apiRouter = require('./routes/api');
const { deleteById } = require('./models/users');
console.log('market5')

var app = express();
console.log('market6')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log('market7')
app.set('view engine', 'pug');
console.log('market8')
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);
app.use('/api', apiRouter);


console.log(app.stack);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req.hostname)
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

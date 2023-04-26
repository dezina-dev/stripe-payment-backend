var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user_routes');
var productRouter = require('./routes/product_routes');
var payRouter = require('./routes/payment_routes');

var app = express();

const PORT = Number(process.env.PORT || 5000);
console.log("PORT", PORT)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//allow OPTIONS on all resources
// app.options('*', cors())
app.use(cors());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/payments', payRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
}).then(res => {
  console.log("mongodb is connected successfully");
}).catch(err => {
  console.log(err);
})

app.listen(PORT, function () {
  console.log('server is running in url http://localhost:' + PORT);
});

module.exports = app;

// mongodb+srv://Dezina:dzi123**@cluster0-sosgh.mongodb.net/test?retryWrites=true&w=majority
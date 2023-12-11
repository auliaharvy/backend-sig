var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var organizationsRouter = require('./src/routes/organizations/app');
var distributorsRouter = require('./src/routes/distributors/app');
var companyTypesRouter = require('./src/routes/company-types/app');
var companiesRouter = require('./src/routes/companies/app');
var driversRouter = require('./src/routes/drivers/app');
var trucksRouter = require('./src/routes/trucks/app');
var palletsRouter = require('./src/routes/pallets/app');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//employe routes
app.use("/api/employees", require("./src/routes/employees/app"))


//organizations routes
app.use("/api/organizations", organizationsRouter);
//organizations routes
app.use("/api/distributors", distributorsRouter);
//company types routes
app.use("/api/company-types", companyTypesRouter);
//companies routes
app.use("/api/companies", companiesRouter);
//drivers routes
app.use("/api/drivers", driversRouter);
//trucks routes
app.use("/api/trucks", trucksRouter);
//pallets routes
app.use("/api/pallets", palletsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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
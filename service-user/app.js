var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users/app');
var rolesRouter = require('./src/routes/roles/app');
var permissionsRouter = require('./src/routes/permissions/app');
var userHasRolesRouter = require('./src/routes/user-has-role/app');
var roleHasPermissionRouter = require('./src/routes/role-has-permission/app');


var device = require('express-device');



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
app.use(device.capture());

app.use('/', indexRouter);
//users routes
app.use('/api/users', usersRouter);
//roles routes
app.use("/api/roles", rolesRouter);
//permissions routes
app.use("/api/permissions", permissionsRouter);
//user has roles routes
app.use("/api/userhasrole", userHasRolesRouter);
//roles has permissions routes
app.use("/api/rolehaspermission", roleHasPermissionRouter);




app.get('/hello', function (req, res) {
  res.send("Hi to " + req.device.type.toUpperCase() + " User");
});
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
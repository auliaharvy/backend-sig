var createError = require('http-errors');
var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var sjpsRouter = require('./src/routes/sjps/app');
var palletsTransfersRouter = require('./src/routes/pallet-transfers/app');
var sjpStatussRouter = require('./src/routes/sjp-statuss/app');
var changeQuotasRouter = require('./src/routes/change-quotas/app');
var newPalletsRouter = require('./src/routes/new-pallets/app');
var palletRealizationsRouter = require('./src/routes/pallet-realizations/app');
var claimPalletsRouter = require('./src/routes/claim-pallets/app');
var sewaPalletsRouter = require('./src/routes/sewa-pallets/app');
var damagedPalletRouter = require('./src/routes/damaged-pallets/app');
var repairedPalletRouter = require('./src/routes/repaired-pallets/app');
var transporterAdjusmentRouter = require('./src/routes/transporter-adjusments/app');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//employe routes
app.use("/api/transaction", require("./src/routes/transaction/app"))

//SJP routes
app.use("/api/sjps", sjpsRouter);
//SJP routes
app.use("/api/sjp-statuss", sjpStatussRouter);
//Pallet Transfer routes
app.use("/api/pallet-transfers", palletsTransfersRouter);
//Change QUota
app.use("/api/change-quotas", changeQuotasRouter);
//New Pallet
app.use("/api/new-pallets", newPalletsRouter);
//New Pallet Realization
app.use("/api/pallet-realizations", palletRealizationsRouter);
//Claim Pallet
app.use("/api/claim-pallets", claimPalletsRouter);
//Sewa Pallet
app.use("/api/sewa-pallets", sewaPalletsRouter);
//Damaged Pallet
app.use("/api/damaged-pallets", damagedPalletRouter);
//Repaired Pallet
app.use("/api/repaired-pallets", repairedPalletRouter);
//Repaired Pallet
app.use("/api/transporter-adjusments", transporterAdjusmentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

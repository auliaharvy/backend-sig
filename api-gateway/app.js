require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const employeeRouter = require('./routes/employee');
const driverRouter = require('./routes/driver');
const refreshTokenRouter = require('./routes/refreshToken');
const webhookRouter = require('./routes/webhook');

const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');


const app = express();

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employee', employeeRouter);
app.use('/drivers', driverRouter);
app.use('/token', refreshTokenRouter);
//app.use('/my-courses',verifyToken,can('admin','student'), myCourseRouter);
app.use('/webhook', webhookRouter);


module.exports = app;
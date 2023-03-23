require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const paymentRouter = require('./routes/payments');
const mediaRouter = require('./routes/media');
const employeeRouter = require('./routes/employee');
const courseRouter = require('./routes/courses');
const chapterRouter = require('./routes/chapters');
const lessonRouter = require('./routes/lessons');
const imageCourseRouter = require('./routes/imageCourses');
const myCourseRouter = require('./routes/myCourses');
const orderPaymentRouter = require('./routes/orderPayment');
const refreshTokenRouter = require('./routes/refreshToken');
const mentorRouter = require('./routes/mentors');
const reviewRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhook');

const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');


const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: false,  limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/payments',verifyToken, paymentRouter);
app.use('/orders',verifyToken,can('admin','student'), orderPaymentRouter);
app.use('/media',mediaRouter);
app.use('/employee',employeeRouter);
app.use('/token', refreshTokenRouter);
app.use('/mentors',verifyToken,can('admin'), mentorRouter);
app.use('/courses',courseRouter);
app.use('/reviews',verifyToken,can('admin','student'), reviewRouter);
app.use('/lessons', verifyToken,can('admin'), lessonRouter);
app.use('/chapters',verifyToken,can('admin'), chapterRouter);
app.use('/image-courses',verifyToken,can('admin'), imageCourseRouter);
app.use('/my-courses',verifyToken,can('admin','student'), myCourseRouter);
app.use('/webhook', webhookRouter);

module.exports = app;

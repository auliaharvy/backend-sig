require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
//Service-user
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const userHasRoleRouter = require('./routes/userHasRole');

//Service-master
const permissionsRouter = require('./routes/permissions');
const employeeRouter = require('./routes/employee');
const organizationsRouter = require('./routes/organizations');
const companyTypesRouter = require('./routes/company-types');
const companiesRouter = require('./routes/companies');
const transactionRouter = require('./routes/transaction');
const refreshTokenRouter = require('./routes/refreshToken');
const webhookRouter = require('./routes/webhook');

const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');


const app = express();
app.use(cors());
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

//Service-user routes
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/permissions', permissionsRouter);
app.use('/userhasrole', userHasRoleRouter);


//Service-master routes
app.use('/employee', employeeRouter);
app.use('/organizations', organizationsRouter);
app.use('/company-types', companyTypesRouter);
app.use('/companies', companiesRouter);
app.use('/transaction', transactionRouter);
app.use('/token', refreshTokenRouter);
//app.use('/my-courses',verifyToken,can('admin','student'), myCourseRouter);
app.use('/webhook', webhookRouter);

module.exports = app;
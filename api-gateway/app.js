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
const driversRouter = require('./routes/drivers');
const trucksRouter = require('./routes/trucks');
const palletsRouter = require('./routes/pallets');
const transactionRouter = require('./routes/transaction');
const refreshTokenRouter = require('./routes/refreshToken');
const webhookRouter = require('./routes/webhook');

//Service-transaction
const sjpsRouter = require('./routes/sjps');
const sjpStatussRouter = require('./routes/sjp-statuss');
const palletTransfersRouter = require('./routes/pallet-transfers');
const changeQuotasRouter = require('./routes/change-quotas');
const newPalletsRouter = require('./routes/new-pallets');
const palletRealizationsRouter = require('./routes/pallet-realizations');
const claimPalletsRouter = require('./routes/claim-pallets');
const sewaPalletsRouter = require('./routes/sewa-pallets');
const damagedPalletsRouter = require('./routes/damaged-pallets');
const repairedPalletsRouter = require('./routes/repaired-pallets');
const transporterAdjusmentRouter = require('./routes/transporter-adjusments');

//Service-reporting
const palletMovementsRouter = require('./routes/pallet-movements');
const dashboardsRouter = require('./routes/dashboards');

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
app.use('/drivers', driversRouter);
app.use('/trucks', trucksRouter);
app.use('/pallets', palletsRouter);
app.use('/transaction', transactionRouter);
app.use('/token', refreshTokenRouter);

//Service-transaction routes
app.use('/sjps', sjpsRouter);
app.use('/sjp-statuss', sjpStatussRouter);
app.use('/pallet-transfers', palletTransfersRouter);
app.use('/change-quotas', changeQuotasRouter);
app.use('/new-pallets', newPalletsRouter);
app.use('/pallet-realizations', palletRealizationsRouter);
app.use('/claim-pallets', claimPalletsRouter);
app.use('/sewa-pallets', sewaPalletsRouter);
app.use('/damaged-pallets', damagedPalletsRouter);
app.use('/repaired-pallets', repairedPalletsRouter);
app.use('/transporter-adjusments', transporterAdjusmentRouter);

//Service-reporting routes
app.use('/pallet-movements', palletMovementsRouter);
app.use('/dashboards', dashboardsRouter);


//app.use('/my-courses',verifyToken,can('admin','student'), myCourseRouter);
app.use('/webhook', webhookRouter);

module.exports = app;
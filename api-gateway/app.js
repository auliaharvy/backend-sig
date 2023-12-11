require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const cors = require('cors');
const helmet = require("helmet");

const indexRouter = require('./routes/index');
//Service-user
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const userHasRoleRouter = require('./routes/userHasRole');
const roleHasPermissionRouter = require('./routes/role-has-permission');

//Service-master
const permissionsRouter = require('./routes/permissions');
const employeeRouter = require('./routes/employee');
const organizationsRouter = require('./routes/organizations');
const distributorsRouter = require('./routes/distributors');
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
const berMissingPalletsRouter = require('./routes/ber-missing-pallets');
const repairedPalletsRouter = require('./routes/repaired-pallets');
const transporterAdjusmentRouter = require('./routes/transporter-adjusments');

//Service-reporting
const palletMovementsRouter = require('./routes/pallet-movements');
const dashboardsRouter = require('./routes/dashboards');
const allTransactionsRouter = require('./routes/all-transactions');

//API - External
const apiExternalRouter = require('./routes/api-external');

const verifyToken = require('./middlewares/verifyToken');
const { requestRateLimiter } = require('./middlewares/rateLimiter');
const can = require('./middlewares/permission');

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");

const app = express();
app.use(helmet({
  frameguard: false,
  noSniff: false,
}));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"]
  }
}));
app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
);
app.use(
  helmet.frameguard({
    action: "deny",
  })
);
app.use(requestRateLimiter);
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
app.use( helmet.hsts( { maxAge: 300, includeSubDomains: true, preload: true } ) );
app.use('/public', express.static('public'))
app.use(cors({
   origin: 'https://pallet.sig.id'
  // origin: 'http://localhost:5000'
}));
app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /");
});

app.use('/sitemap.xml', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /");
});

app.use('/', indexRouter);

//Service-user routes
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/permissions', permissionsRouter);
app.use('/userhasrole', userHasRoleRouter);
app.use('/rolehaspermission', roleHasPermissionRouter);


//Service-master routes
app.use('/employee', employeeRouter);
app.use('/organizations', verifyToken, organizationsRouter);
app.use('/distributors', verifyToken, distributorsRouter);
app.use('/company-types', verifyToken, companyTypesRouter);
app.use('/companies', verifyToken, companiesRouter);
app.use('/drivers', verifyToken, driversRouter);
app.use('/trucks', verifyToken, trucksRouter);
app.use('/pallets', verifyToken, palletsRouter);
app.use('/transaction', verifyToken, transactionRouter);
app.use('/token', refreshTokenRouter);

//Service-transaction routes
app.use('/sjps', verifyToken, sjpsRouter);
app.use('/sjp-statuss', verifyToken, sjpStatussRouter);
app.use('/pallet-transfers', verifyToken, palletTransfersRouter);
app.use('/change-quotas', verifyToken, changeQuotasRouter);
app.use('/new-pallets', verifyToken, newPalletsRouter);
app.use('/pallet-realizations', verifyToken, palletRealizationsRouter);
app.use('/claim-pallets', verifyToken, claimPalletsRouter);
app.use('/sewa-pallets', verifyToken, sewaPalletsRouter);
app.use('/damaged-pallets', verifyToken, damagedPalletsRouter);
app.use('/ber-missing-pallets', verifyToken, berMissingPalletsRouter);
app.use('/repaired-pallets', verifyToken, repairedPalletsRouter);
app.use('/transporter-adjusments', verifyToken, transporterAdjusmentRouter);

//Service-reporting routes
app.use('/pallet-movements', verifyToken, palletMovementsRouter);
app.use('/dashboards', dashboardsRouter);
app.use('/all-transactions', verifyToken, allTransactionsRouter);

//API - External routes
app.use('/api-external', apiExternalRouter);


//app.use('/my-courses',verifyToken,can('admin','student'), myCourseRouter);
app.use('/webhook', webhookRouter);

module.exports = app;

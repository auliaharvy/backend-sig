const express = require('express');
const router = express.Router();
const dashboardHandler = require('./handler/dashboards');
const verifyToken = require('../middlewares/verifyToken');

// router.get('/', verifyToken, companyHandler.getAll);
router.get('/total-pallet', dashboardHandler.getTotalPallet);
router.get('/pallet-condition', dashboardHandler.getPalletCondition);
router.get('/detail-pallet', dashboardHandler.getDetailPallet);
router.get('/pallet-condition-company', dashboardHandler.getPalletConditionCompany);

module.exports = router;
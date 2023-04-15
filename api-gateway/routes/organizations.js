const express = require('express');
const router = express.Router();
const organizationHandler = require('./handler/organizations');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', organizationHandler.create);
// router.get('/', verifyToken, organizationHandler.getAll);
router.get('/', organizationHandler.getAll);
router.get('/:id', organizationHandler.getOrganization);
router.patch('/:id', organizationHandler.update);
router.delete('/:id', organizationHandler.destroy);

module.exports = router;
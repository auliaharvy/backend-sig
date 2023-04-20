const {
  rolesSelects,
  rolesUpdates,
  rolesDeletes,
  roleAdds,
  roleAddPermissionController,
} = require("../../controller/roles/app");

const { roleValidationRules, validateRole } = require('../../middlewares/validator/validator-role')

const route = ({
  router,
  makeExpressCallback,
  validateAuth,
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(rolesSelects));
  router.get("/:id", makeExpressCallback(rolesSelects));
  // #####
  // POST
  router.post("/",roleValidationRules(), validateRole, makeExpressCallback(roleAdds));

  router.post("/rolehaspermissions", makeExpressCallback(roleAddPermissionController));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(rolesUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(rolesDeletes));

  return router;
};

module.exports = route;
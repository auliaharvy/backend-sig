const {
  permissionByRoleIdAdds,
  permissionByRoleIdSelects,
  permissionByRoleIdDeletes,
} = require("../../controller/role-has-permission/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  // router.get("/", makeExpressCallback(rolesSelects));
  router.get("/:id", makeExpressCallback(permissionByRoleIdSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(permissionByRoleIdAdds));

  // #####
  // DELETE
  router.delete("/:user_id", makeExpressCallback(permissionByRoleIdDeletes));

  return router;
};

module.exports = route;
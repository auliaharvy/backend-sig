const {
  rolesSelects,
  rolesUpdates,
  rolesDeletes,
  roleAdds,
} = require("../../controller/roles/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(rolesSelects));
  router.get("/:id", makeExpressCallback(rolesSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(roleAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(rolesUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(rolesDeletes));

  return router;
};

module.exports = route;
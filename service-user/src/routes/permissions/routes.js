const {
  permissionsSelects,
  permissionsUpdates,
  permissionsDeletes,
  permissionAdds,
} = require("../../controller/permissions/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(permissionsSelects));
  router.get("/:id", makeExpressCallback(permissionsSelects));
  // #####


  router.post("/", makeExpressCallback(permissionAdds));


  // #####
  // PATCH

  // update permission
  router.patch("/:id", makeExpressCallback(permissionsUpdates));

  // #####
  // DELETE

  router.delete("/:id", makeExpressCallback(permissionsDeletes));

  return router;
};

module.exports = route;
const {
  organizationsSelects,
  organizationsUpdates,
  organizationsDeletes,
  organizationAdds,
} = require("../../controller/organizations/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(organizationsSelects));
  router.get("/:id", makeExpressCallback(organizationsSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(organizationAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(organizationsUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(organizationsDeletes));

  return router;
};

module.exports = route;
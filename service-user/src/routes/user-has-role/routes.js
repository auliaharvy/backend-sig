const {
  roleByUserIdAdds,
  roleByUserIdSelects,
  roleByUserIdDeletes,
} = require("../../controller/user-has-role/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  // router.get("/", makeExpressCallback(rolesSelects));
  router.get("/:id", makeExpressCallback(roleByUserIdSelects));

  // #####
  // POST
  router.post("/", makeExpressCallback(roleByUserIdAdds));

  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(roleByUserIdDeletes));

  return router;
};

module.exports = route;
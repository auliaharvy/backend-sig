const {
  rolesSelects,
  rolesUpdates,
  rolesDeletes,
  roleInserts,
} = require("../../controller/roles/app");

// const {
//   create,
//   getTokens,
// } = require("../../controller/refresh-token/app");

// const refreshTokenHandler = require('../../controller/refresh-token');

const route = ({
  router,
  makeExpressCallback
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(rolesSelects));
  router.get("/:id", makeExpressCallback(rolesSelects));
  // #####


  router.post("/", makeExpressCallback(roleInserts));

  //router.get("/refresh", makeExpressCallback(getTokens));
  // router.post("/token", create);


  // #####
  // PATCH

  // update employee
  router.patch("/:id", makeExpressCallback(rolesUpdates));

  // #####
  // DELETE

  router.delete("/:id", makeExpressCallback(rolesDeletes));

  return router;
};

module.exports = route;
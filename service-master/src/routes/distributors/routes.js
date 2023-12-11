const {
  distributorsSelects,
  distributorsUpdates,
  distributorsDeletes,
  distributorAdds,
} = require("../../controller/distributors/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(distributorsSelects));
  router.get("/:id", makeExpressCallback(distributorsSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(distributorAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(distributorsUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(distributorsDeletes));

  return router;
};

module.exports = route;
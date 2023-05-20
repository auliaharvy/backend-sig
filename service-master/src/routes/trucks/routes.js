const {
  trucksSelects,
  trucksUpdates,
  trucksDeletes,
  truckAdds,
} = require("../../controller/trucks/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(trucksSelects));
  router.get("/:id", makeExpressCallback(trucksSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(truckAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(trucksUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(trucksDeletes));

  return router;
};

module.exports = route;
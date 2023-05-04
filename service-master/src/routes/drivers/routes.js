const {
  driversSelects,
  driversUpdates,
  driversDeletes,
  driverAdds,
} = require("../../controller/drivers/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(driversSelects));
  router.get("/:id", makeExpressCallback(driversSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(driverAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(driversUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(driversDeletes));

  return router;
};

module.exports = route;
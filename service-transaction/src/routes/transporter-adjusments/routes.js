const {
  transporterAdjusmentAdds,
  transporterAdjusmentSelects,
  transporterAdjusmentUpdates,
  transporterAdjusmentDeletes,
} = require("../../controller/transporter-adjusments/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(transporterAdjusmentSelects));
  router.get("/:id", makeExpressCallback(transporterAdjusmentSelects));
  router.get("/export", makeExpressCallback(transporterAdjusmentSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(transporterAdjusmentAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(transporterAdjusmentUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(transporterAdjusmentDeletes));

  return router;
};

module.exports = route;
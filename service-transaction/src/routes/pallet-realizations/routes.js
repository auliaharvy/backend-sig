const {
  palletRealizationAdds,
  palletRealizationSelects,
  palletRealizationUpdates,
  palletRealizationDeletes,
} = require("../../controller/pallet-realizations/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(palletRealizationSelects));
  router.get("/:id", makeExpressCallback(palletRealizationSelects));
  router.get("/export", makeExpressCallback(palletRealizationSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(palletRealizationAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(palletRealizationUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(palletRealizationDeletes));

  return router;
};

module.exports = route;
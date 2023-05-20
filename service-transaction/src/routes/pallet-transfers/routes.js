const {
  palletTransferAdds,
  palletTransferSelects,
  palletTransferUpdates,
  palletTransferDeletes,
} = require("../../controller/pallet-transfers/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(palletTransferSelects));
  router.get("/:id", makeExpressCallback(palletTransferSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(palletTransferAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(palletTransferUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(palletTransferDeletes));

  return router;
};

module.exports = route;
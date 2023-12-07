const {
  berMissingPalletAdds,
  berMissingPalletSelects,
  berMissingPalletUpdates,
  berMissingPalletDeletes,
} = require("../../controller/ber-missing-pallets/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(berMissingPalletSelects));
  router.get("/:id", makeExpressCallback(berMissingPalletSelects));
  router.get("/export", makeExpressCallback(berMissingPalletSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(berMissingPalletAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(berMissingPalletUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(berMissingPalletDeletes));

  return router;
};

module.exports = route;
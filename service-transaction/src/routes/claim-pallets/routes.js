const {
  claimPalletAdds,
  claimPalletSelects,
  claimPalletUpdates,
  claimPalletDeletes,
} = require("../../controller/claim-pallets/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(claimPalletSelects));
  router.get("/:id", makeExpressCallback(claimPalletSelects));
  router.get("/export", makeExpressCallback(claimPalletSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(claimPalletAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(claimPalletUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(claimPalletDeletes));

  return router;
};

module.exports = route;
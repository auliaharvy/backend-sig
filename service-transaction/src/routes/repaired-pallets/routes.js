const {
  repairedPalletAdds,
  repairedPalletSelects,
  repairedPalletUpdates,
  repairedPalletDeletes,
} = require("../../controller/repaired-pallets/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(repairedPalletSelects));
  router.get("/:id", makeExpressCallback(repairedPalletSelects));
  router.get("/export", makeExpressCallback(repairedPalletSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(repairedPalletAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(repairedPalletUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(repairedPalletDeletes));

  return router;
};

module.exports = route;
const {
  newPalletAdds,
  newPalletSelects,
  newPalletUpdates,
  newPalletDeletes,
} = require("../../controller/new-pallets/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(newPalletSelects));
  router.get("/:id", makeExpressCallback(newPalletSelects));
  router.get("/export", makeExpressCallback(newPalletSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(newPalletAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(newPalletUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(newPalletDeletes));

  return router;
};

module.exports = route;
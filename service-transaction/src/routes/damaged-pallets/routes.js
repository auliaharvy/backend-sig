const {
  damagedPalletAdds,
  damagedPalletSelects,
  damagedPalletUpdates,
  damagedPalletDeletes,
} = require("../../controller/damaged-pallets/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(damagedPalletSelects));
  router.get("/:id", makeExpressCallback(damagedPalletSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(damagedPalletAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(damagedPalletUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(damagedPalletDeletes));

  return router;
};

module.exports = route;
const {
  sewaPalletAdds,
  sewaPalletSelects,
  sewaPalletUpdates,
  sewaPalletDeletes,
} = require("../../controller/sewa-pallets/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(sewaPalletSelects));
  router.get("/:id", makeExpressCallback(sewaPalletSelects));
  router.get("/export", makeExpressCallback(sewaPalletSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(sewaPalletAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(sewaPalletUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(sewaPalletDeletes));

  return router;
};

module.exports = route;
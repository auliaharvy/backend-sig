const {
  palletsSelects,
  palletsUpdates,
  palletsDeletes,
  palletAdds,
} = require("../../controller/pallets/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(palletsSelects));
  router.get("/:id", makeExpressCallback(palletsSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(palletAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(palletsUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(palletsDeletes));

  return router;
};

module.exports = route;
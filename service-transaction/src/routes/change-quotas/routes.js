const {
  changeQuotaAdds,
  changeQuotaSelects,
  changeQuotaUpdates,
  changeQuotaDeletes,
} = require("../../controller/change-quotas/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(changeQuotaSelects));
  router.get("/:id", makeExpressCallback(changeQuotaSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(changeQuotaAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(changeQuotaUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(changeQuotaDeletes));

  return router;
};

module.exports = route;
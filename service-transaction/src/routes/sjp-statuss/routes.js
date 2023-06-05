const {
  sjpStatusAdds,
  sjpStatusSelects,
  sjpStatusUpdates,
  sjpStatusDeletes,
} = require("../../controller/sjp-statuss/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(sjpStatusSelects));
  router.get("/:id", makeExpressCallback(sjpStatusSelects));
  router.get("/export", makeExpressCallback(sjpStatusSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(sjpStatusAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(sjpStatusUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(sjpStatusDeletes));

  return router;
};

module.exports = route;
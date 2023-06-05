const {
  sjpAdds,
  sjpSelects,
  sjpUpdates,
  sjpDeletes,
} = require("../../controller/sjps/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(sjpSelects));
  router.get("/:id", makeExpressCallback(sjpSelects));
  router.get("/export", makeExpressCallback(sjpSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(sjpAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(sjpUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(sjpDeletes));

  return router;
};

module.exports = route;
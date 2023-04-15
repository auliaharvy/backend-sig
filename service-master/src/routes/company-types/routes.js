const {
  companyTypesSelects,
  companyTypesUpdates,
  companyTypesDeletes,
  companyTypeAdds,
} = require("../../controller/company-types/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(companyTypesSelects));
  router.get("/:id", makeExpressCallback(companyTypesSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(companyTypeAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(companyTypesUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(companyTypesDeletes));

  return router;
};

module.exports = route;
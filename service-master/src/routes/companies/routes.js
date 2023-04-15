const {
  companiesSelects,
  companiesUpdates,
  companiesDeletes,
  companyAdds,
} = require("../../controller/companies/app");

const route = ({
  router,
  makeExpressCallback,
  validateAuth
}) => {
  // #####
  // GET
  router.get("/", makeExpressCallback(companiesSelects));
  router.get("/:id", makeExpressCallback(companiesSelects));
  // #####
  // POST
  router.post("/", makeExpressCallback(companyAdds));

  // #####
  // PATCH
  router.patch("/:id", makeExpressCallback(companiesUpdates));
  // #####
  // DELETE
  router.delete("/:id", makeExpressCallback(companiesDeletes));

  return router;
};

module.exports = route;
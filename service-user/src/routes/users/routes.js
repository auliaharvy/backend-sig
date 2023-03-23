const {
    usersLogin,
    usersSelects,
    usersUpdates,
    usersDeletes,
    userRegisters,
  } = require("../../controller/users/app");
  
  const refreshTokenHandler = require('../../controller/refresh-token');
  
  const route = ({ router, makeExpressCallback, validateAuth }) => {
    // #####
    // GET
    router.get("/", makeExpressCallback(usersSelects));
    router.get("/:id", validateAuth, makeExpressCallback(usersSelects));
    // #####
    // POST
    router.post("/login", makeExpressCallback(usersLogin));

    router.post("/register", makeExpressCallback(userRegisters));

    router.post("/token", refreshTokenHandler.create);
  
    // #####
    // PATCH
  
    // update employee
    router.patch("/:id", validateAuth, makeExpressCallback(usersUpdates));
  
    // #####
    // DELETE
  
    router.delete("/:id", validateAuth, makeExpressCallback(usersDeletes));
  
    return router;
  };
  
  module.exports = route;
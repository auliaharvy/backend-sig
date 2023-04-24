const {
    usersLogin,
    usersSelects,
    usersUpdates,
    usersDeletes,
    userRegisters,
  } = require("../../controller/users/app");

  const {
    create,
    getTokens,
  } = require("../../controller/refresh-token/app");

  const { loginValidationRules, validatelogin } = require('../../middlewares/validator/validator-login')
  
  const refreshTokenHandler = require('../../controller/refresh-token');
  
  const route = ({ router, makeExpressCallback }) => {
    // #####
    // GET
    router.get("/all", makeExpressCallback(usersSelects));
    router.get("/:id", makeExpressCallback(usersSelects));
    // #####
    // POST
    router.post("/login",loginValidationRules(), validatelogin, makeExpressCallback(usersLogin));

    router.post("/register", makeExpressCallback(userRegisters));

    //router.get("/refresh", makeExpressCallback(getTokens));
    router.post("/token", create);
    
  
    // #####
    // PATCH
  
    // update employee
    router.patch("/:id", makeExpressCallback(usersUpdates));
  
    // #####
    // DELETE
  
    router.delete("/:id", makeExpressCallback(usersDeletes));
  
    return router;
  };
  
  module.exports = route;
const {
    driverAdds,
    driversSelects,
    driversUpdates,
    driversDeletes,
} = require("../../controller/drivers/app");

const route = ({
    router,
    makeExpressCallback,
    validateAuth
}) => {
    // #####
    // GET
    router.get("/", makeExpressCallback(driversSelects));
    router.get("/:id", validateAuth, makeExpressCallback(driversSelects));
    // #####
    // POST

    // add new employee
    router.post("/", validateAuth, makeExpressCallback(driverAdds));

    // #####
    // PATCH

    // update employee
    router.patch("/:id", validateAuth, makeExpressCallback(driversUpdates));

    // #####
    // DELETE

    router.delete("/:id", validateAuth, makeExpressCallback(driversDeletes));

    return router;
};

module.exports = route;
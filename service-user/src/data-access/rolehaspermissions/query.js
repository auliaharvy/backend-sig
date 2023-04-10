const query = ({
    connects,
    models,
}) => {
    return Object.freeze({
        selectRole,
        selectPermission,
        insertRoleHasPermission,
        patchRoleHasPermission,
        deleteRoleHasPermission,
    });

    async function selectRole({}) {
        try {
            const pool = await connects();

            const res = await new Promise((resolve) => {
                const sql = `SELECT * FROM "roles";`;
                pool.query(sql, (err, res) => {
                    pool.end(); // end connection

                    if (err) resolve(err);
                    resolve(res);
                });
            });

            return res;
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    async function selectPermission({}) {
        try {
            const pool = await connects();

            const res = await new Promise((resolve) => {
                const sql = `SELECT * FROM "permissions";`;
                pool.query(sql, (err, res) => {
                    pool.end(); // end connection

                    if (err) resolve(err);
                    resolve(res);
                });
            });

            return res;
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    async function insertRoleHasPermission({
        data
    }) {
        try {
            // use sequelize on inserting
            const RoleHasPermission = models.RoleHasPermission;
            const res = await RoleHasPermission.create(data);
            return res;
        } catch (e) {
            console.log("Error: ", e);
        }
    }


    async function patchRoleHasPermission({
        data
    }) {
        try {
            // use sequelize on update
            const RoleHasPermission = models.RoleHasPermission;
            const res = await RoleHasPermission.update({
                name: data.name,
            }, {
                where: {
                    id: data.id,
                },
            });
            return res;
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    async function deleteRoleHasPermission({
        id
    }) {
        try {
            // use sequelize on inserting
            const RoleHasPermission = models.RoleHasPermission;
            const res = await RoleHasPermission.destroy({
                where: {
                    id,
                },
            });
            return res;
        } catch (e) {
            console.log("Error: ", e);
        }
    }


};

module.exports = query;
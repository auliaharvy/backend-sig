const query = ({
    connects,
    models
}) => {
    return Object.freeze({
        insertNewDriver,
        checkNameExist,
        selectAll,
        selectOne,
        checkNameExistUpdate,
        patchDriver,
        deleteDriver,
    });

    async function deleteDriver({
        id
    }) {
        try {
            // use sequelize on inserting
            const Driver = models.Drivers;
            const res = await Driver.destroy({
                where: {
                    id,
                },
            });
            return res;
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    async function insertNewDriver({
        data
    }) {
        try {
            // use sequelize on inserting
            const Driver = models.Drivers;
            const res = await Driver.create(data);
            return res;
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    async function checkNameExist({
        data
    }) {
        try {
            const pool = await connects();

            const {
                name
            } = data; // deconstruct

            const res = await new Promise((resolve) => {
                const sql = `SELECT id FROM "Drivers" WHERE "name" = $1 ;`;
                const params = [name];
                pool.query(sql, params, (err, res) => {
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

    async function selectAll({}) {
        try {
            const pool = await connects();

            const res = await new Promise((resolve) => {
                const sql = `SELECT * FROM "Drivers";`;
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

    async function selectOne({
        id
    }) {
        try {
            const pool = await connects();

            const res = await new Promise((resolve) => {
                const sql = `SELECT * FROM "Drivers" WHERE id = $1;`;
                const params = [id];
                pool.query(sql, params, (err, res) => {
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

    async function checkNameExistUpdate({
        data
    }) {
        try {
            const pool = await connects();

            const {
                name,
                id
            } = data; // deconstruct

            const res = await new Promise((resolve) => {
                const sql = `SELECT id FROM "Drivers" WHERE "name" = $1 AND id <> $2;`;
                const params = [name, id];
                pool.query(sql, params, (err, res) => {
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

    async function patchDriver({
        data
    }) {
        try {
            // use sequelize on update
            const Employee = models.Driver;
            const res = await Driver.update({
                name: data.name,
                age: data.age,
                sim: data.sim,
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
};

module.exports = query;
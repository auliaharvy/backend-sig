const selectDriver = ({
    driversDb,
    decrypt
}) => {
    return async function select(info) {
        let data = [];

        const {
            id
        } = info; // deconstruct

        if (id) {
            // select one
            const res = await driversDb.selectOne({
                id
            });
            if (res.rowCount > 0) {
                // only when there is data returned
                const items = res.rows;
                for (let i = 0; i < items.length; i++) {
                    const e = items[i];

                    // push items to array
                    data.push({
                        id: e.id,
                        name: e.name ? decrypt(e.name) : null,
                        sim: e.sim ? decrypt(e.sim) : null,
                        age: e.age ? e.age : 0,
                        createdAt: e.createdAt,
                        updatedAt: e.updatedAt,
                    });
                }
            }
        } else {
            // select all
            const res = await driversDb.selectAll({});
            if (res.rowCount > 0) {
                // only when there is data returned
                const items = res.rows;
                for (let i = 0; i < items.length; i++) {
                    const e = items[i];

                    // push items to array
                    data.push({
                        id: e.id,
                        name: e.name ? decrypt(e.name) : null,
                        sim: e.sim ? decrypt(e.sim) : null,
                        age: e.age ? e.age : 0,
                        createdAt: e.createdAt,
                        updatedAt: e.updatedAt,
                    });
                }
            }
        }
        return data;
    };
};

module.exports = selectDriver;
const selectRoleHasPermission = ({
    roleHasPermissionsDB
}) => {
    return async function select(info) {
        let data = [];

        const {
            id
        } = info; // deconstruct

        if (id) {
            // select one
            const res = await roleHasPermissionsDB.selectOne({
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
                        id_role: e.id_role ? e.id_role : null,
                        id_permission: e.id_role ? e.id_role : null,
                    });
                }
            }
        } else {
            // select all
            const res = await roleHasPermissionsDB.selectAll({});
            if (res.rowCount > 0) {
                // only when there is data returned
                const items = res.rows;
                for (let i = 0; i < items.length; i++) {
                    const e = items[i];

                    // push items to array
                    data.push({
                        id: e.id,
                        id_role: e.id_role ? e.id_role : null,
                        id_permission: e.id_role ? e.id_role : null,
                    });
                }
            }
        }
        return data;
    };
};

module.exports = selectRoleHasPermission;
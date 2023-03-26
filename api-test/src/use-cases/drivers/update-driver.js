const updateDriver = ({
    driversDb,
    patchDrivers
}) => {
    return async function put({
        id,
        ...info
    }) {
        let data = patchDrivers(id, info);

        data = {
            id: data.getId(),
            name: data.getN(),
            sim: data.getSim(),
            age: data.getAge(),
        };

        // check id if employee exist
        const checkId = await driversDb.selectOne({
            id: data.id
        });
        if (checkId.rowCount == 0)
            throw new Error(`Driver doesn't exist, please check.`);

        // check if name exist
        const check = await driversDb.checkNameExistUpdate({
            data
        });
        if (check.rowCount > 0)
            throw new Error(`Driver already exist, please check.`);

        // update
        const res = await driversDb.patchDriver({
            data
        });

        let msg = `Driver was not updated, please try again`;
        if (res[0] == 1) {
            msg = `Driver updated successfully.`;
            return msg;
        } else {
            throw new Error(msg);
        }
    };
};

module.exports = updateDriver;
const addDriver = ({
    makeDrivers,
    driversDb
}) => {
    return async function post(info) {
        let data = await makeDrivers(info); // entity

        data = {
            name: data.getN(),
            sim: data.getSim(),
            age: data.getAge(),
        };

        // to do checking if name already exist
        const check = await driversDb.checkNameExist({
            data
        });
        if (check.rowCount > 0)
            throw new Error(`Driver already exist, please check.`);
        //   insert
        const res = await driversDb.insertNewDriver({
            data
        });

        // ##
        let msg = `Error on inserting driver, please try again.`;

        if (res) {
            msg = `Driver has been added successfully.`;
            return msg;
        } else {
            throw new Error(msg);
        }
    };
};

module.exports = addDriver;
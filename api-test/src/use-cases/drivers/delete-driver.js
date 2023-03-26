const deleteDriver = ({
    driversDb
}) => {
    return async function select(info) {
        const {
            id
        } = info;
        // delete query
        const res = await driversDb.deleteDriver({
            id
        });
        let msg = `Employee was not deleted, please try again.`;
        if (res == 1) {
            msg = `Driver deleted successfully.`;
            return msg;
        } else {
            throw new Error(msg);
        }
    };
};

module.exports = deleteDriver;
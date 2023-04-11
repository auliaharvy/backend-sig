const makeRoleHasPermission = ({}) => {
    return function make({
        id_role,
        id_permission
    } = {}) {
        if (!id_role) {
            throw new Error("Please enter roles.");
        }
        if (!id_permission) {
            throw new Error("Please enter permissions.");
        }
        return Object.freeze({
            getIdRole: () => id_role,
            getIdPermission: () => id_permission,

        });
    };
};

module.exports = makeRoleHasPermission;
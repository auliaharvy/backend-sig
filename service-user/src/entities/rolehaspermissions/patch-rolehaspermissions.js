const patchRoleHasPermission = ({

}) => {
    return function make(id, {
        id_role,
        id_permission
    } = {}) {
        if (!id) {
            throw new Error("Please enter ID of role has Permission.");
        }
        if (!id_role) {
            throw new Error("Please enter role.");
        }
        if (!id_permission) {
            throw new Error("Please enter permission.");
        }

        return Object.freeze({
            getId: () => id,
            getIdRole: () => id_role,
            getIdPermission: () => id_permission,
        });
    };
};

module.exports = patchRoleHasPermission;
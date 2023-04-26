const makePermissionByRoleIds = ({}) => {
  return function make({
    idRole,
    idPermission,
  } = {}) {
    if (!idRole) {
      throw new Error("Please enter User.");
    }
    if (!idPermission) {
      throw new Error("Please enter Role.");
    }

    return Object.freeze({
      getIdRole: () => idRole,
      getIdPermission: () => idPermission,

    });
  };
};

module.exports = makePermissionByRoleIds;
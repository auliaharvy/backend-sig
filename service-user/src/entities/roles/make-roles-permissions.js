const makeRolePermission = ({}) => {
  
  return function make({
    data
  } = {}) {
    if (!data) {
      throw new Error("Please enter roles.");
    }
    return Object.freeze({
      getData: () => data,

    });
  };
};

module.exports = makeRolePermission;
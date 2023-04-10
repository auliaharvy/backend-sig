const makePermission = ({}) => {
  return function make({
    name
  } = {}) {
    if (!name) {
      throw new Error("Please enter permissions.");
    }
    return Object.freeze({
      getPermission: () => name,

    });
  };
};

module.exports = makePermission;
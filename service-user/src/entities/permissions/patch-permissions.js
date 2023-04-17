const patchPermission = ({
  encrypt
}) => {
  return function make(id, {
    name
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of permission.");
    }
    if (!name) {
      throw new Error("Please enter permission.");
    }
    return Object.freeze({
      getId: () => id,
      getPermission: () => name,
    });
  };
};

module.exports = patchPermission;
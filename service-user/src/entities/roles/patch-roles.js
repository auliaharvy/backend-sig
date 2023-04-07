const patchRole = ({}) => {
  return function make(id, {
    name
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of role.");
    }
    if (!name) {
      throw new Error("Please enter role.");
    }
    return Object.freeze({
      getId: () => id,
      getRole: () => name,
    });
  };
};

module.exports = patchRole;
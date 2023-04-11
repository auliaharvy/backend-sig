const makeRole = ({}) => {
  return function make({
    name
  } = {}) {
    if (!name) {
      throw new Error("Please enter roles.");
    }
    return Object.freeze({
      getRole: () => name,

    });
  };
};

module.exports = makeRole;
const makeRole = ({validator}) => {
  return function make({
    name
  } = {}) {
    if (!name) {
      throw new Error("Please enter roles.");
    }
    return Object.freeze({
      getRole: () => validator.escape(name),

    });
  };
};

module.exports = makeRole;
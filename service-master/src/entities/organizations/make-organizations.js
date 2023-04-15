const makeOrganization = ({}) => {
  return function make({
    name
  } = {}) {
    if (!name) {
      throw new Error("Please enter organizations.");
    }
    return Object.freeze({
      getOrganization: () => name,

    });
  };
};

module.exports = makeOrganization;
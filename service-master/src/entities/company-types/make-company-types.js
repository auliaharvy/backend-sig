const makeCompanyType = ({}) => {
  return function make({
    name
  } = {}) {
    if (!name) {
      throw new Error("Please enter Company Type.");
    }
    return Object.freeze({
      getCompanyType: () => name,

    });
  };
};

module.exports = makeCompanyType;
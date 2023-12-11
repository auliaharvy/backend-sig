const makeDistributor = ({}) => {
  return function make({
    name,
    code
  } = {}) {
    if (!name) {
      throw new Error("Please enter Name.");
    }
    if (!code) {
      throw new Error("Please enter Code.");
    }
    return Object.freeze({
      getDistributorName: () => name,
      getDistributorCode: () => code,

    });
  };
};

module.exports = makeDistributor;
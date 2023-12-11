const patchDistributor = ({
  encrypt
}) => {
  return function make(id, {
    name,
    code
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of Distributor.");
    }
    if (!name) {
      throw new Error("Please enter Distributor Name.");
    }
    if (!code) {
      throw new Error("Please enter Distributor Code.");
    }
    return Object.freeze({
      getId: () => id,
      getDistributorName: () => name,
      getDistributorCode: () => code,
    });
  };
};

module.exports = patchDistributor;
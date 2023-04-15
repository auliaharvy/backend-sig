const patchCompanyType = ({
  encrypt
}) => {
  return function make(id, {
    name
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of Company Type.");
    }
    if (!name) {
      throw new Error("Please enter Company Type.");
    }
    return Object.freeze({
      getId: () => id,
      getCompanyType: () => name,
    });
  };
};

module.exports = patchCompanyType;
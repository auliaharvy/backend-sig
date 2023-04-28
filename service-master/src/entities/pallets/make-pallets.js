const makePallet = ({}) => {
  return function make({
    name,
    created_by,
  } = {}) {
    if (!name) {
      throw new Error("Please enter Pallet.");
    }
    if (!created_by) {
      throw new Error("Please enter Created By.");
    }
    return Object.freeze({
      getPallet: () => name,
      getCreatedBy: () => created_by,

    });
  };
};

module.exports = makePallet;
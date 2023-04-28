const patchPallet = ({
  encrypt
}) => {
  return function make(id, {
    name,
    updated_by,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of Pallets.");
    }
    if (!name) {
      throw new Error("Please enter Pallet.");
    }
    if (!updated_by) {
      throw new Error("Please enter Updated By.");
    }
    return Object.freeze({
      getId: () => id,
      getPallet: () => name,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = patchPallet;
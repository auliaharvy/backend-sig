const makeChangeQuotas = ({}) => {
  return function make({
    id_company_requester,
    id_requester,
    quantity,
    type,
    reason,
    created_by,
    updated_by,
  } = {}) {
    if (!id_company_requester) {
      throw new Error("Please enter Requester Company.");
    }
    if (!id_requester) {
      throw new Error("Please enter Requester User.");
    }
    if (!quantity) {
      throw new Error("Please enter Quantity.");
    }
    if (!type) {
      throw new Error("Please enter Type.");
    }

    return Object.freeze({
      getCompany: () => id_company_requester,
      getRequester: () => id_requester,
      getQuantity: () => quantity,
      getType: () => type,
      getReason: () => reason,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = makeChangeQuotas;

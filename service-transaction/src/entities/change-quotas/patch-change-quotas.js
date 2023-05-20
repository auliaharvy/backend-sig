const patchChangeQuota = ({}) => {
  return function make(id, {
    id_company_requester,
    id_approver,
    approved_quantity,
    status,
    type,
    note,
    updated_by,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of Pallet Transfer.");
    }
    if (!id_company_requester) {
      throw new Error("Please enter Company.");
    }
    if (!id_approver) {
      throw new Error("Please enter User Approver.");
    }
    if (!status) {
      throw new Error("Please enter Status.");
    }
    return Object.freeze({
      getId: () => id,
      getCompany: () => id_company_requester,
      getApprover: () => id_approver,
      getStatus: () => status,
      getType: () => type,
      getQuantity: () => approved_quantity,
      getNote: () => note,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = patchChangeQuota;

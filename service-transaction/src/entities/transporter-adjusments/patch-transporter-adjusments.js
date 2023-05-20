const patchTransporterAdjusments = ({}) => {
  return function make(id, {
    id_company_transporter,
    id_company,
    id_user_reporter,
    is_from_pool,
    good_pallet,
    tbr_pallet,
    ber_pallet,
    missing_pallet,
    note,
    created_by,
    updated_by,
  } = {}) {
    if (!id_company_transporter) {
      throw new Error("Please enter Company Transporter.");
    }
    if (!id_company) {
      throw new Error("Please enter Company.");
    }
    if (!id_user_reporter) {
      throw new Error("Please enter User.");
    }
    if (!is_from_pool) {
      throw new Error("Please enter Type Adjusment.");
    }

    return Object.freeze({
      getId: () => id,
      getCompanyTransporter: () => id_company_transporter,
      getCompany: () => id_company,
      getUser: () => id_user_reporter,
      getType: () => is_from_pool,
      getGood: () => good_pallet,
      getTbr: () => tbr_pallet,
      getBer: () => ber_pallet,
      getMissing: () => missing_pallet,
      getNote: () => note,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = patchTransporterAdjusments;

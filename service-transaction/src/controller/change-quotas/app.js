const {
  addChangeQuotas,
  selectChangeQuotas,
  updateChangeQuotas,
  deleteChangeQuotas,
  } = require("../../use-cases/change-quotas/app");
  // #########
  const changeQuotaAdd = require("./insert-change-quota");
  const changeQuotaSelect = require("./select-change-quota");
  const changeQuotaUpdate = require("./update-change-quota");
  const changeQuotaDelete = require("./delete-change-quota");
  // #########
  const changeQuotaAdds = changeQuotaAdd({ addChangeQuotas });
  const changeQuotaSelects = changeQuotaSelect({ selectChangeQuotas });
  const changeQuotaUpdates = changeQuotaUpdate({ updateChangeQuotas });
  const changeQuotaDeletes = changeQuotaDelete({ deleteChangeQuotas });
  // #########
  const services = Object.freeze({
    changeQuotaAdds,
    changeQuotaSelects,
    changeQuotaUpdates,
    changeQuotaDeletes,
  });
  
  module.exports = services;
  module.exports = {
    changeQuotaAdds,
    changeQuotaSelects,
    changeQuotaUpdates,
    changeQuotaDeletes,
  };
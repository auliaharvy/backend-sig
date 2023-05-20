const {
  addTransporterAdjusments,
  selectTransporterAdjusments,
  updateTransporterAdjusments,
  deleteTransporterAdjusments,
  } = require("../../use-cases/transporter-adjusments/app");
  // #########
  const transporterAdjusmentAdd = require("./insert-transporter-adjusment");
  const transporterAdjusmentSelect = require("./select-transporter-adjusment");
  const transporterAdjusmentUpdate = require("./update-transporter-adjusment");
  const transporterAdjusmentDelete = require("./delete-transporter-adjusment");
  // #########
  const transporterAdjusmentAdds = transporterAdjusmentAdd({ addTransporterAdjusments });
  const transporterAdjusmentSelects = transporterAdjusmentSelect({ selectTransporterAdjusments });
  const transporterAdjusmentUpdates = transporterAdjusmentUpdate({ updateTransporterAdjusments });
  const transporterAdjusmentDeletes = transporterAdjusmentDelete({ deleteTransporterAdjusments });
  // #########
  const services = Object.freeze({
    transporterAdjusmentAdds,
    transporterAdjusmentSelects,
    transporterAdjusmentUpdates,
    transporterAdjusmentDeletes,
  });
  
  module.exports = services;
  module.exports = {
    transporterAdjusmentAdds,
    transporterAdjusmentSelects,
    transporterAdjusmentUpdates,
    transporterAdjusmentDeletes,
  };
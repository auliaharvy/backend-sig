const {
  addSjpStatuss,
  selectSjpStatuss,
  updateSjpStatuss,
  deleteSjpStatuss,
  } = require("../../use-cases/sjp-statuss/app");
  // #########
  const sjpStatusAdd = require("./insert-sjp-status");
  const sjpStatusSelect = require("./select-sjp-status");
  const sjpStatusUpdate = require("./update-sjp-status");
  const sjpStatusDelete = require("./delete-sjp-status");
  // #########
  const sjpStatusAdds = sjpStatusAdd({ addSjpStatuss });
  const sjpStatusSelects = sjpStatusSelect({ selectSjpStatuss });
  const sjpStatusUpdates = sjpStatusUpdate({ updateSjpStatuss });
  const sjpStatusDeletes = sjpStatusDelete({ deleteSjpStatuss });
  // #########
  const services = Object.freeze({
    sjpStatusAdds,
    sjpStatusSelects,
    sjpStatusUpdates,
    sjpStatusDeletes,
  });
  
  module.exports = services;
  module.exports = {
    sjpStatusAdds,
    sjpStatusSelects,
    sjpStatusUpdates,
    sjpStatusDeletes,
  };
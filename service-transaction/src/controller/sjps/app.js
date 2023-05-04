const {
  addSjps,
  selectSjps,
  updateSjps,
  deleteSjps,
  } = require("../../use-cases/sjps/app");
  // #########
  const sjpAdd = require("./insert-sjp");
  const sjpsSelect = require("./select-sjp");
  const sjpsUpdate = require("./update-sjp");
  const sjpsDelete = require("./delete-sjp");
  // #########
  const sjpAdds = sjpAdd({ addSjps });
  const sjpSelects = sjpsSelect({ selectSjps });
  const sjpUpdates = sjpsUpdate({ updateSjps });
  const sjpDeletes = sjpsDelete({ deleteSjps });
  // #########
  const services = Object.freeze({
    sjpAdds,
    sjpSelects,
    sjpUpdates,
    sjpDeletes,
  });
  
  module.exports = services;
  module.exports = {
    sjpAdds,
    sjpSelects,
    sjpUpdates,
    sjpDeletes,
  };
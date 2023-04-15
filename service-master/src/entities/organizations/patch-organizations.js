const patchOrganization = ({
  encrypt
}) => {
  return function make(id, {
    name
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of organization.");
    }
    if (!name) {
      throw new Error("Please enter organization.");
    }
    return Object.freeze({
      getId: () => id,
      getOrganization: () => name,
    });
  };
};

module.exports = patchOrganization;
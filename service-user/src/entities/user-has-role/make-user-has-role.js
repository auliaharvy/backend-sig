const makeRoleByUserId = ({}) => {
  return function make({
    idUser,
    idRole,
    idCompany
  } = {}) {
    if (!idUser) {
      throw new Error("Please enter User.");
    }
    if (!idRole) {
      throw new Error("Please enter Role.");
    }
    if (!idCompany) {
      throw new Error("Please enter Company.");
    }
    return Object.freeze({
      getIdUser: () => idUser,
      getIdRole: () => idRole,
      getIdCompany: () => idCompany

    });
  };
};

module.exports = makeRoleByUserId;
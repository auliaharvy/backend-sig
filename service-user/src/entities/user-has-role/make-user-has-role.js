const makeRoleByUserId = ({}) => {
  return function make({
    user_id,
    role_id,
    company_id
  } = {}) {
    if (!user_id) {
      throw new Error("Please enter User.");
    }
    if (!role_id) {
      throw new Error("Please enter Role.");
    }
    if (!company_id) {
      throw new Error("Please enter Company.");
    }
    return Object.freeze({
      getIdUser: () => user_id,
      getIdRole: () => role_id,
      getIdCompany: () => company_id,

    });
  };
};

module.exports = makeRoleByUserId;
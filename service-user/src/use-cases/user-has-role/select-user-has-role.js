const selectRoleByUserId = ({
  userHasRoleDB
}) => {
  return async function select(info) {
    let data = [];

    const {
      id
    } = info; // deconstruct

    // select one
    const res = await userHasRoleDB.selectRoleByUserId({
      id
    });
    if (res.rowCount > 0) {
      // only when there is data returned
      const items = res.rows;
      for (let i = 0; i < items.length; i++) {
        const e = items[i];

        // push items to array
        data.push({
          idUser: e.user_id,
          idRole: e.role_id,
          idCompany: e.company_id,
        });
      }
    }

    return data;
  };
};

module.exports = selectRoleByUserId;
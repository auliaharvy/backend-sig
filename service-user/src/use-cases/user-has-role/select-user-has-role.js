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
          user_id: e.user_id,
          role_id: e.role_id,
          company_id: e.company_id,
        });
      }
    }

    return ({
      status: 200,
      message: `Success`,
      data: data
    });
  };
};

module.exports = selectRoleByUserId;
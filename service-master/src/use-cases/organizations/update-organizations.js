const updateOrganization = ({
  organizationsDB,
  patchOrganizations
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchOrganizations(id, info);

    data = {
      id: data.getId(),
      name: data.getOrganization(),
    };

    // check id if organization exist

    const checkId = await organizationsDB.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`Organization doesn't exist, please check.`);

    // check if organization exist
    const check = await organizationsDB.checkOrganizationExistUpdate({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Organization already exist, please check.`);

    // update
    const res = await organizationsDB.patchOrganization({
      data
    });

    let msg = `Organization was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Organization updated successfully.`;
      return msg;
    } else {
      // throw new Error(msg);
      console.log(checkId);
    }
  };
};

module.exports = updateOrganization;
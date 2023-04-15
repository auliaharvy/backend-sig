const addOrganization = ({
  makeOrganizations,
  organizationsDB
}) => {
  return async function post(info) {
    let data = await makeOrganizations(info); // entity

    data = {
      name: data.getOrganization(),
    };
    // to do checking if name already exist
    const check = await organizationsDB.checkOrganizationExist({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Organization already exist, please check.`);
    //   insert
    const res = await organizationsDB.insertOrganization({
      data
    });

    // ##
    let msg = `Error on inserting Organization, please try again.`;

    if (res) {
      msg = `Organization has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = addOrganization;
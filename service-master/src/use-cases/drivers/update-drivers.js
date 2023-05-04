const updateDriver = ({
  driversDb,
  patchDrivers
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchDrivers(id, info);

    data = {
      id: data.getId(),
      id_company: data.getCompany(),
      name: data.getName(),
      createdBy: data.getCreatedBy(),
      updatedBy: data.getUpdatedBy(),
    };

    // check id if company exist
    console.log(data);
    const checkId = await driversDb.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`Driver doesn't exist, please check.`);

    // update
    const res = await driversDb.patchDriver({
      data
    });

    let msg = `Driver was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Driver updated successfully.`;
      return msg;
    } else {
      // throw new Error(msg);
      console.log(checkId);
    }
  };
};

module.exports = updateDriver;
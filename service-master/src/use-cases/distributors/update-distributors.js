const updateDistributor = ({
  distributorsDB,
  patchDistributors
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchDistributors(id, info);

    data = {
      id: data.getId(),
      name: data.getDistributorName(),
      code: data.getDistributorCode(),
    };

    // check id if Distributor exist

    const checkId = await distributorsDB.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`Distributor doesn't exist, please check.`);

    // check if Distributor exist
    const check = await distributorsDB.checkDistributorExistUpdate({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Distributor already exist, please check.`);

    // update
    const res = await distributorsDB.patchDistributor({
      data
    });

    let msg = `Distributor was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Distributor updated successfully.`;
      return msg;
    } else {
      // throw new Error(msg);
      //(checkId);
    }
  };
};

module.exports = updateDistributor;
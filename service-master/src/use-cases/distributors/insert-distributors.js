const addDistributor = ({
  makeDistributors,
  distributorsDB
}) => {
  return async function post(info) {
    let data = await makeDistributors(info); // entity

    data = {
      name: data.getDistributorName(),
      code: data.getDistributorCode(),
    };
    // to do checking if name already exist
    const check = await distributorsDB.checkDistributorExist({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Distributor already exist, please check.`);
    //   insert
    const res = await distributorsDB.insertDistributor({
      data
    });

    // ##
    let msg = `Error on inserting Distributor, please try again.`;

    if (res) {
      msg = `Distributor has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = addDistributor;
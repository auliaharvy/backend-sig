const addDriver = ({ makeDrivers, driversDb }) => {
  return async function post(info) {
    let data = await makeDrivers(info); // entity

    data = {
      id_company: data.getCompany(),
      name: data.getName(),
      createdBy: data.getCreatedBy(),
      updatedBy: data.getUpdatedBy(),
    };

    //   insert
    const res = await driversDb.insertDriver({
      data,
    });

    // ##
    let msg = `Error on inserting Driver, please try again.`;

    if (res) {
      msg = `Driver has been added successfully.`;
      return res;
    } else {
      throw new Error(res);
    }
  };
};

module.exports = addDriver;

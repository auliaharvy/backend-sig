const addTruck = ({ makeTrucks, trucksDb }) => {
  return async function post(info) {
    let data = await makeTrucks(info); // entity

    data = {
      id_company: 91,
      license_plate: data.getLicensePlate(),
      createdBy: data.getCreatedBy(),
      updatedBy: data.getUpdatedBy(),
    };

    //   insert
    const res = await trucksDb.insertTruck({
      data,
    });

    // ##
    let msg = `Error on inserting Truck, please try again.`;

    if (res) {
      msg = `Truck has been added successfully.`;
      return res;
    } else {
      throw new Error(res);
    }
  };
};

module.exports = addTruck;

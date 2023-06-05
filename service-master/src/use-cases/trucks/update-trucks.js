const updateTruck = ({
  trucksDb,
  patchTrucks
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchTrucks(id, info);

    data = {
      id: data.getId(),
      id_company: 4,
      license_plate: data.getLicensePlate(),
      updatedBy: data.getUpdatedBy(),
    };

    // check id if company exist
    const checkId = await trucksDb.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`Truck doesn't exist, please check.`);

    // update
    const res = await trucksDb.patchTruck({
      data
    });

    let msg = `Truck was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Truck updated successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = updateTruck;
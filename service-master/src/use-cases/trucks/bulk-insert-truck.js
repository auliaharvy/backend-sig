const bulkAddTruck = ({ bulkTrucks, trucksDb }) => {
  return async function post(info) {
    let data = await bulkTrucks(info); // entity

    // data = {
    //   id_company: 4,
    //   data: data.getData(),
    //   createdBy: data.getCreatedBy(),
    //   updatedBy: data.getUpdatedBy(),
    // };

    var dataTruck = data.getData();
    var dataBulk = [];

    // //(dataTruck.length)
    for(var i=0; i < dataTruck.length; i++)  {
      dataBulk.push({
        id_company: 4,
        license_plate: dataTruck[i].NO_POL,
        transporter_code: dataTruck[i].EXPEDITUR_CODE,
        createdBy: data.getCreatedBy(),
        updatedBy: data.getUpdatedBy(),
      });
    }

    //   insert
    const res = await trucksDb.bulkInsertTruck(
      dataBulk,
    );

    // ##
    let msg = `Error on synchronizing Truck, please try again.`;

    if (res) {
      msg = `Truck has been synchronize successfully.`;
      return res;
    } else {
      throw new Error(res);
    }
  };
};

module.exports = bulkAddTruck;

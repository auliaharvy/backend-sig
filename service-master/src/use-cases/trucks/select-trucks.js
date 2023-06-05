const selectTruck = ({ trucksDb }) => {
  return async function select(info) {
    let data = [];

    const { id } = info; // deconstruct

    if (id) {
      // select one
      const res = await trucksDb.selectOne({
        id,
      });
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            id_company: e.id_company,
            transporter_code: e.transporter_code,
            license_plate: e.license_plate,
            company_name: e.company_name,
          });
        }
      }
    } else {
      // select all
      const res = await trucksDb.selectAll({});
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            id_company: e.id_company,
            transporter_code: e.transporter_code,
            license_plate: e.license_plate,
            company_name: e.company_name,
          });
        }
      }
    }
    return data;
  };
};

module.exports = selectTruck;

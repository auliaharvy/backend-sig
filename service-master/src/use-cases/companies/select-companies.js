const selectCompany = ({
  companiesDB
}) => {
  return async function select(info) {
    let data = [];

    const {
      id
    } = info; // deconstruct

    if (id) {
      // select one
      const res = await companiesDB.selectOne({
        id
      });
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            idOrganization: e.idOrganization,
            idCompanyType: e.idCompanyType,
            name: e.name ? e.name : null,
            code: e.code ? e.code : null,
            address: e.address ? e.address : null,
            city: e.city ? e.city : null,
            phone: e.phone ? e.phone : null,
            email: e.email ? e.email : null,
            tag: e.tag ? e.tag : null,
            createdBy: e.createdBy,
            updatedBy: e.updatedBy,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          });
        }
      }
    } else {
      // select all
      const res = await companiesDB.selectAll({});
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            idOrganization: e.idOrganization,
            idCompanyType: e.idCompanyType,
            name: e.name ? e.name : null,
            code: e.code ? e.code : null,
            address: e.address ? e.address : null,
            city: e.city ? e.city : null,
            phone: e.phone ? e.phone : null,
            email: e.email ? e.email : null,
            tag: e.tag ? e.tag : null,
            createdBy: e.createdBy,
            updatedBy: e.updatedBy,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          });
        }
      }
    }
    return data;
  };
};

module.exports = selectCompany;
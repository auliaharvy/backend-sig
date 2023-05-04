const selectCompany = ({ companiesDB }) => {
  return async function select(info) {
    let data = [];

    const { id } = info; // deconstruct

    if (id) {
      // select one
      const res = await companiesDB.selectOne({
        id,
      });
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // mendapatkan jumlah pallet di company
          const resPalletQuantity = await companiesDB.getPalletQuantity(
            id
          );

          // push items to array
          data.push({
            id: e.id,
            id_organization: e.id_organization,
            name_organization: e.name_organization,
            id_company_type: e.id_company_type,
            name_company_type: e.name_company_type,
            name: e.name ? e.name : null,
            code: e.code ? e.code : null,
            address: e.address ? e.address : null,
            city: e.city ? e.city : null,
            phone: e.phone ? e.phone : null,
            email: e.email ? e.email : null,
            tag: e.tag ? e.tag : null,
            quota: e.pallet_quota ? e.pallet_quota : null,
            palletQuantity: resPalletQuantity.rows ? resPalletQuantity.rows : [
              {
                kondisi_pallet: "TBR Pallet",
                "quantity": 0
              },
              {
                kondisi_pallet: "BER Pallet",
                  "quantity": 0
              },
              {
                kondisi_pallet: "Missing Pallet",
                  "quantity": 0
              },
              {
                kondisi_pallet: "Good Pallet",
                  "quantity": 0
              }
            ],
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
          const idCompany = items[i]['id'];
          console.log(idCompany);

          // mendapatkan jumlah pallet di company
          var resPalletQuantity = await companiesDB.getPalletQuantity(
            idCompany
          );

          // push items to array
          data.push({
            id: e.id,
            id_organization: e.id_organization,
            name_organization: e.name_organization,
            id_company_type: e.id_company_type,
            name_company_type: e.name_company_type,
            name: e.name ? e.name : null,
            code: e.code ? e.code : null,
            address: e.address ? e.address : null,
            city: e.city ? e.city : null,
            phone: e.phone ? e.phone : null,
            email: e.email ? e.email : null,
            tag: e.tag ? e.tag : null,
            quota: e.pallet_quota ? e.pallet_quota : null,
            palletQuantity: resPalletQuantity.rows ? resPalletQuantity.rows : [
              {
                kondisi_pallet: "TBR Pallet",
                "quantity": 0
              },
              {
                kondisi_pallet: "BER Pallet",
                  "quantity": 0
              },
              {
                kondisi_pallet: "Missing Pallet",
                  "quantity": 0
              },
              {
                kondisi_pallet: "Good Pallet",
                  "quantity": 0
              }
            ],
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

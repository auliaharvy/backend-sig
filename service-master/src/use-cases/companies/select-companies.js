const selectCompany = ({ companiesDB }) => {
  return async function select(info) {
    //(info)
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

          var qtyGoodPallet = 0;
          var qtyTbrPallet = 0;
          var qtyBerPallet = 0;
          var qtyMissingPallet = 0;
          //(resPalletQuantity.rows);
          for (const qtyPallet of resPalletQuantity.rows) {
            if(qtyPallet.kondisi_pallet == 'Good Pallet') {
              qtyGoodPallet = parseInt(qtyPallet.quantity)
            }
            if(qtyPallet.kondisi_pallet == 'TBR Pallet') {
              qtyTbrPallet = parseInt(qtyPallet.quantity)
            }
            if(qtyPallet.kondisi_pallet == 'BER Pallet') {
              qtyBerPallet = parseInt(qtyPallet.quantity)
            }
            if(qtyPallet.kondisi_pallet == 'Missing Pallet') {
              qtyMissingPallet = parseInt(qtyPallet.quantity)
            }
          }  

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
            good_pallet: qtyGoodPallet ? qtyGoodPallet : 0,
            tbr_pallet: qtyTbrPallet ? qtyTbrPallet : 0,
            ber_pallet: qtyBerPallet ? qtyBerPallet : 0,
            missing_pallet: qtyMissingPallet ? qtyMissingPallet : 0,
            total_pallet: qtyGoodPallet + qtyTbrPallet + qtyBerPallet + qtyMissingPallet,
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
          //(idCompany);

          // mendapatkan jumlah pallet di company
          var resPalletQuantity = await companiesDB.getPalletQuantity(
            idCompany
          );

          var qtyGoodPallet = 0;
          var qtyTbrPallet = 0;
          var qtyBerPallet = 0;
          var qtyMissingPallet = 0;
          //(resPalletQuantity.rows);
          for (const qtyPallet of resPalletQuantity.rows) {
            if(qtyPallet.kondisi_pallet == 'Good Pallet') {
              qtyGoodPallet = parseInt(qtyPallet.quantity)
            }
            if(qtyPallet.kondisi_pallet == 'TBR Pallet') {
              qtyTbrPallet = parseInt(qtyPallet.quantity)
            }
            if(qtyPallet.kondisi_pallet == 'BER Pallet') {
              qtyBerPallet = parseInt(qtyPallet.quantity)
            }
            if(qtyPallet.kondisi_pallet == 'Missing Pallet') {
              qtyMissingPallet = parseInt(qtyPallet.quantity)
            }
          }  

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
            good_pallet: qtyGoodPallet ? qtyGoodPallet : 0,
            tbr_pallet: qtyTbrPallet ? qtyTbrPallet : 0,
            ber_pallet: qtyBerPallet ? qtyBerPallet : 0,
            missing_pallet: qtyMissingPallet ? qtyMissingPallet : 0,
            total_pallet: qtyGoodPallet + qtyTbrPallet + qtyBerPallet + qtyMissingPallet,
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

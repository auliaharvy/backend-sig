const selectTotalPallet = ({ dashboardDb }) => {
  return async function select() {
    let data = [];
    let dataTotal = [];
    let dataTotalCompanyType = [];

    // select all
    const res = await dashboardDb.totalPalletPlant({});
    const resTotalCompany = await dashboardDb.totalPalletCompany({});
    const resTotalCompanyType = await dashboardDb.totalPallet({});
    if (res) {
      // only when there is data returned
      const items = res;
      // //(items);
      for (let i = 0; i < items.length; i++) {
        const e = items[i].dataValues;
        // push items to array
        data.push(e);
      }
    }
    if (resTotalCompany) {
      // only when there is data returned
      const itemsTotal = resTotalCompany;
      // //(items);
      for (let i = 0; i < itemsTotal.length; i++) {
        const e = itemsTotal[i].dataValues;
        // push items to array
        dataTotal.push(e);
      }
    }
    if (resTotalCompanyType) {
      // only when there is data returned
      const itemsTotalCompanyType = resTotalCompanyType;
      // //(items);
      for (let i = 0; i < itemsTotalCompanyType.length; i++) {
        const e = itemsTotalCompanyType[i].dataValues;
        // push items to array
        dataTotalCompanyType.push(e);
      }
    }
    // console.log(data);
    dataAll = { data, dataTotal, dataTotalCompanyType } ;
    const result = dataAll.data.map((organization) => {
      const companyTypesData = dataAll.dataTotal.filter(
        (company) => company.id_organization === organization.id
      );
    
      const companyTypes = companyTypesData.reduce((acc, company) => {
        const existing = acc.find((ct) => ct.nama === company.name);
        if (existing) {
          existing.jumlahPallet += parseFloat(company.jumlah_pallet);
        } else {
          acc.push({
            nama: company.name,
            type: company.id_company_type,
            jumlahPallet: parseFloat(company.jumlah_pallet),
          });
        }
        return acc;
      }, []);
    
      return {
        nama: organization.name,
        total: parseFloat(organization.jumlah_pallet),
        companyTypes,
      };
    });

    const groupedResult = result.map((organization) => {
      const companyTypesByID = organization.companyTypes.reduce((acc, companyType) => {
        const existing = acc.find((ct) => ct.type === companyType.type);
        if (existing) {
          // existing.companyTypes.push(companyType);
          existing.totalPallet += companyType.jumlahPallet;
        } else {
          acc.push({
            type: companyType.type,
            // companyTypes: [companyType],
            totalPallet: companyType.jumlahPallet,
          });
        }
        return acc;
      }, []);

      const typeMappings = {
        "1": "Buffer PZ",
        "2": "Pool Pallet",
        "3": "Warehouse",
        "4": "Transporter",
        "5": "Workshop",
      };

      for (const companyTypesGroup of companyTypesByID) {
        const typeName = typeMappings[companyTypesGroup.type]; // Access type name using mapping
        companyTypesGroup.typeName = typeName; // Add typeName property to each group
      }
    
      return {
        nama: organization.nama,
        total: organization.total,
        companyTypesByID,
      };
    });
    
    return groupedResult ;
  };
};

module.exports = selectTotalPallet;

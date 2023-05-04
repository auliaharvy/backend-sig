const query = ({ connects, models }) => {
  return Object.freeze({
    checkCompanyExist,
    insertCompany,
    selectAll,
    selectOne,
    checkCompanyExistUpdate,
    patchCompany,
    deleteCompany,
    getPalletQuantity,
  });

  async function insertCompany({ data }) {
    try {
      // use sequelize on inserting
      const Company = models.Companies;
      const res = await Company.create(data);
      const idCompany = res.id;
      // pallet
      const pool = await connects();

      const mstPallets = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_pallet" WHERE is_deleted = 0;`;
        pool.query(sql, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res.rows);
        });
      });

      // console.log(mstPallets);
      for (const mstPallet of mstPallets) {
        var dataCompanyPallet = {
          'mst_pallet_id': mstPallet.id,
          'mst_companies_id': idCompany,
          'quantity': 0
        }
        const companiesPallet = models.CompaniesPallet;
        console.log(companiesPallet);
        const res = await companiesPallet.create(dataCompanyPallet);
      }

      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function checkCompanyExist({ data }) {
    try {
      const pool = await connects();

      const { code } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_companies" WHERE "code" = $1;`;
        const params = [code];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function selectAll({}) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT c.*, o.name as name_organization , ct.name as name_company_type FROM "mst_companies" as c
        JOIN "mst_organization" as o ON c."id_organization" = o.id
        JOIN "mst_company_type" as ct ON c."id_company_type" = ct.id
        WHERE c.is_deleted = 0;`;
        pool.query(sql, (err, res) => {
          pool.end(); // end connection
          if (err) resolve(err);
          resolve(res);
        });
      });
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function selectOne({ id }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as name_organization , c.name as name_company_type 
        FROM "mst_companies" as a
        JOIN "mst_organization" as b ON a."id_organization" = b.id
        JOIN "mst_company_type" as c ON a."id_company_type" = c.id
        WHERE a.is_deleted = 0 AND a.id = $1;`;
        const params = [id];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function getPalletQuantity(id) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT b.name as kondisi_pallet , a.quantity
        FROM "mst_pallet_mst_companies" as a
        JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
        WHERE a.mst_companies_id = $1;`;
        const params = [id];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection
          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function checkCompanyExistUpdate({ data }) {
    try {
      const pool = await connects();

      const { name, id } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_companies" WHERE "name" = $1 AND id <> $2 ;`;
        const params = [name, id];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function patchCompany({ data }) {
    try {
      // use sequelize on update
      const Company = models.Companies;
      const res = await Company.update(
        {
          name: data.name,
          id_organization: data.id_organization,
          id_company_type: data.id_company_type,
          code: data.code,
          address: data.address,
          phone: data.phone,
          email: data.email,
          tag: data.tag,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
          city: data.city,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function deleteCompany({ id }) {
    try {
      // use sequelize on inserting
      const Company = models.Companies;
      const res = await Company.update(
        {
          is_deleted: 1,
        },
        {
          where: {
            id,
          },
        }
      );
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }
};

module.exports = query;

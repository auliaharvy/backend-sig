const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    checkCompanyExist,
    insertCompany,
    selectAll,
    selectOne,
    checkCompanyExistUpdate,
    patchCompany,
    deleteCompany,
  });

  async function insertCompany({
    data
  }) {
    try {
      // use sequelize on inserting
      const Company = models.Companies;
      const res = await Company.create(data);
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function checkCompanyExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_companies" WHERE "name" = $1;`;
        const params = [name];
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

  async function selectOne({
    id
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT c.*, o.name as name_organization , ct.name as name_company_type FROM "mst_companies" as c
        JOIN "mst_organization" as o ON c."id_organization" = o.id
        JOIN "mst_company_type" as ct ON c."id_company_type" = ct.id
        WHERE c.is_deleted = 0 AND c.id = $1;`;
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

  async function checkCompanyExistUpdate({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
        id
      } = data; // deconstruct

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

  async function patchCompany({
    data
  }) {
    try {
      // use sequelize on update
      const Company = models.Companies;
      const res = await Company.update({
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
      }, {
        where: {
          id: data.id,
        },
      });
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function deleteCompany({
    id
  }) {
    try {
      // use sequelize on inserting
      const Company = models.Companies;
      const res = await Company.update({
        is_deleted: 1,
      }, {
        where: {
          id,
        },
      });
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }


};

module.exports = query;
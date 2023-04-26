const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    checkCompanyTypeExist,
    insertCompanyType,
    selectAll,
    selectOne,
    checkCompanyTypeExistUpdate,
    patchCompanyType,
    deleteCompanyType,

  });

  async function insertCompanyType({
    data
  }) {
    try {
      // use sequelize on inserting
      const CompanyType = models.CompanyTypes;
      const res = await CompanyType.create(data);
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function checkCompanyTypeExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_company_type" WHERE "name" = $1;`;
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
        const sql = `SELECT * FROM "mst_company_type" WHERE is_deleted = 0;`;
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
        const sql = `SELECT * FROM "mst_company_type" WHERE id = $1 AND is_deleted = 0;`;
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

  async function checkCompanyTypeExistUpdate({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
        id
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_company_type" WHERE "name" = $1 AND id <> $2 ;`;
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

  async function patchCompanyType({
    data
  }) {
    try {
      // use sequelize on update
      const CompanyType = models.CompanyTypes;
      const res = await CompanyType.update({
        name: data.name,
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

  async function deleteCompanyType({
    id
  }) {
    try {
      // use sequelize on inserting
      const CompanyType = models.CompanyTypes;
      const res = await CompanyType.update({
        is_deleted: 1
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

  async function listCompanyType({
    // parameter user id from table user_has_companytypes
    user_id
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_company_type" WHERE user_id = $1;`;
        const params = [user_id];
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

};

module.exports = query;
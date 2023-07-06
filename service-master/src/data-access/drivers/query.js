const query = ({ connects, models }) => {
  return Object.freeze({
    checkDriverExist,
    insertDriver,
    selectAll,
    selectOne,
    checkCompanyExistUpdate,
    patchDriver,
    deleteDriver,
  });

  async function insertDriver({ data }) {
    try {
      // use sequelize on inserting
      const Driver = models.Drivers;
      const res = await Driver.create(data);

      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function checkDriverExist({ data }) {
    try {
      const pool = await connects();

      const { name } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_driver" WHERE "name" = $1;`;
        const params = [name];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function selectAll({}) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as company_name
        FROM "mst_driver" as a
        JOIN "mst_companies" as b ON a."id_company" = b.id
        WHERE a.is_deleted = 0;`;
        pool.query(sql, (err, res) => {
          pool.end(); // end connection
          if (err) resolve(err);
          resolve(res);
        });
      });
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function selectOne({ id }) {
    try {
      const pool = await connects();
      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as company_name
        FROM "mst_driver" as a
        JOIN "mst_companies" as b ON a."id_company" = b.id
        WHERE a.is_deleted = $2 AND a.id=$1;`;
        const params = [id, 0];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection
          
          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      //("Error: ", e);
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
      //("Error: ", e);
    }
  }

  async function patchDriver({ data }) {
    try {
      // use sequelize on update
      const Driver = models.Drivers;
      const res = await Driver.update(
        {
          name: data.name,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function deleteDriver({ id }) {
    try {
      // use sequelize on inserting
      const Driver = models.Drivers;
      const res = await Driver.update(
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
      //("Error: ", e);
    }
  }
};

module.exports = query;

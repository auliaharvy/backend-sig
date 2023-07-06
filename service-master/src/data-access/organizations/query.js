const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    checkOrganizationExist,
    insertOrganization,
    selectAll,
    selectOne,
    checkOrganizationExistUpdate,
    patchOrganization,
    deleteOrganization
  });

  async function insertOrganization({
    data
  }) {
    try {
      // use sequelize on inserting
      const Organization = models.Organizations;
      const res = await Organization.create(data);
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function checkOrganizationExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_organization" WHERE "name" = $1;`;
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
        const sql = `SELECT * FROM "mst_organization" WHERE "is_deleted" = $1;`;
        const params = [0];
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

  async function selectOne({
    id
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_organization" WHERE id = $1;`;
        const params = [id];
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

  async function checkOrganizationExistUpdate({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
        id
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_organization" WHERE "name" = $1 AND id <> $2 ;`;
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

  async function patchOrganization({
    data
  }) {
    try {
      // use sequelize on update
      const Organization = models.Organizations;
      const res = await Organization.update({
        name: data.name,
      }, {
        where: {
          id: data.id,
        },
      });
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function deleteOrganization({
    id
  }) {
    try {
      // use sequelize on inserting
      const Organization = models.Organizations;
      const res = await Organization.update({
        is_deleted: 1,
      }, {
        where: {
          id,
        },
      });
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }


};

module.exports = query;
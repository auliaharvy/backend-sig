const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    checkPermissionExist,
    insertPermission,
    selectAll,
    selectOne,
    checkPermissionExistUpdate,
    patchPermission,
    deletePermission,
  });

  async function insertPermission({
    data
  }) {
    try {
      // use sequelize on inserting
      const Permission = models.Permissions;
      const res = await Permission.create(data);
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function checkPermissionExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "permissions" WHERE "name" = $1;`;
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
        const sql = `SELECT * FROM "permissions" WHERE is_deleted = 0;`;
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
        const sql = `SELECT * FROM "permissions" WHERE id = $1 AND is_deleted = 0;`;
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

  async function checkPermissionExistUpdate({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
        id
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "permissions" WHERE "name" = $1 AND id <> $2 ;`;
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

  async function patchPermission({
    data
  }) {
    try {
      // use sequelize on update
      const Permission = models.Permissions;
      const res = await Permission.update({
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

  async function deletePermission({
    id
  }) {
    try {
      // use sequelize on inserting
      const Permission = models.Permissions;
      const res = await Permission.update({
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

};

module.exports = query;
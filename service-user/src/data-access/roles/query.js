const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    checkRoleExist,
    checkRolePermissionExist,
    insertRole,
    insertRolePermission,
    selectAll,
    selectOne,
    checkRoleExistUpdate,
    patchRole,
    deleteRole,
    deleteRolePermission,
  });

  async function insertRole({
    data
  }) {
    try {
      // use sequelize on inserting
      const Role = models.Roles;
      const res = await Role.create(data);
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function insertRolePermission({
    data_insert
  }) {
    try {
      // use sequelize on inserting
      const RoleHasPermission = models.RoleHasPermission;
      const res = await RoleHasPermission.bulkCreate(data_insert);
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function checkRoleExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "roles" WHERE "name" = $1;`;
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

  async function checkRolePermissionExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        id_role,
        id_permission,
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id_role FROM "role_has_permission" WHERE "id_role" = $1 AND "id_permission" = $2;`;
        const params = [id_role, id_permission];
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
        const sql = `SELECT * FROM "roles";`;
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
        const sql = `SELECT * FROM "roles" WHERE id = $1;`;
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

  async function checkRoleExistUpdate({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
        id
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "roles" WHERE "name" = $1 AND id <> $2 ;`;
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

  async function patchRole({
    data
  }) {
    try {
      // use sequelize on update
      const Role = models.Roles;
      const res = await Role.update({
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

  async function deleteRole({
    id
  }) {
    try {
      // use sequelize on inserting
      const Role = models.Roles;
      const res = await Role.update({
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

  async function deleteRolePermission({ id_role : id }) {
    try {
      // use sequelize on inserting
      const RoleHasPermission = models.RoleHasPermission ;
      const res = await RoleHasPermission.destroy({
        where: {
          id_role: id,
        },
      });
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

};

module.exports = query;
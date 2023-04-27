const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    selectPermissionByRoleId,
    insertPermissionByRoleId,
    deletePermissionByRoleId,
  });

  async function selectPermissionByRoleId({
    id_role
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "role_has_permission" WHERE id_role = $1;`;
        const params = [id_role];
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

  async function insertPermissionByRoleId({
    data
  }) {
    try {
      // // use sequelize on inserting
      const RoleHasPermission = models.RoleHasPermission;
      const res = await RoleHasPermission.create(data);

      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }


  async function deletePermissionByRoleId({
    idRole
  }) {
    try {
      // use sequelize on inserting
      const RoleHasPermission = models.RoleHasPermission;
      const res = await RoleHasPermission.destroy({
        where: {
          idRole,
        },
      });
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }


};

module.exports = query;
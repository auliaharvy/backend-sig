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
    idUser
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "role_has_permission" WHERE user_id = $1;`;
        const params = [idUser];
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
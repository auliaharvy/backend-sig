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
    id
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT rhp.*, p.name as permission_name, r.name as role_name 
        FROM "role_has_permission" as rhp
        JOIN "roles" as r ON rhp.id_role = r.id
        JOIN "permissions" as p ON rhp.id_permission = p.id
        WHERE id_role = $1;`;
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

  async function insertPermissionByRoleId({
    data
  }) {
    try {
      // // use sequelize on inserting
      const RoleHasPermission = models.RoleHasPermission;
      const res = await RoleHasPermission.create(data);

      return res;
    } catch (e) {
      //("Error: ", e);
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
      //("Error: ", e);
    }
  }


};

module.exports = query;
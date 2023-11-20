const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    selectRoleByUserId,
    insertRoleByUserId,
    deleteRoleByUserId,
  });

  async function selectRoleByUserId({
    id
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "user_has_role" WHERE "user_id" = $1;`;
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

  async function insertRoleByUserId({
    data
  }) {
    try {
      // // use sequelize on inserting
      const UserHasRole = models.UserHasRole;
      const res = await UserHasRole.create(data);
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }


  async function deleteRoleByUserId({
    data
  }) {
    try {
      // use sequelize on inserting
      const UserHasRole = models.UserHasRole;
      const res = await UserHasRole.destroy({
        where: {
          user_id: data.user_id,
          role_id: data.role_id,
          company_id: data.company_id,
        },
      });
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      //("Error: ", e);
    }
  }



};

module.exports = query;
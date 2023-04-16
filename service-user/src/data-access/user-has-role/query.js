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
    idUser
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "user_has_role" WHERE user_id = $1;`;
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

  async function insertRoleByUserId({
    data
  }) {
    try {
      // // use sequelize on inserting
      const UserHasRole = models.UserHasRole;
      const res = await UserHasRole.create(data);

      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }


  async function deleteRoleByUserId({
    idUser
  }) {
    try {
      // use sequelize on inserting
      const UserHasRole = models.UserHasRole;
      const res = await UserHasRole.destroy({
        where: {
          idUser,
        },
      });
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }


};

module.exports = query;
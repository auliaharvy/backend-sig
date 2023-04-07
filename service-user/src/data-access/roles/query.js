const query = ({
  connects,
  models,
  bcrypt
}) => {
  return Object.freeze({
    checkRoleExist,
    selectAll,
    selectOne,
    checkRoleExistUpdate,
    patchRole,
    deleteRole,
  });

  async function checkRoleExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        username,
        fullname
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "Roles" WHERE "username" = $1 AND "fullname" = $2;`;
        const params = [username, fullname];
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
        const sql = `SELECT * FROM "Roles";`;
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
        const sql = `SELECT * FROM "users" WHERE id = $1;`;
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
        firstName,
        lastName,
        id
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "users" WHERE "firstName" = $1 AND id <> $3 AND "lastName" = $2 AND id <> $3;`;
        const params = [firstName, lastName, id];
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
      const User = models.Users;
      const res = await User.update({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
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
      const Employee = models.Employees;
      const res = await Employee.destroy({
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
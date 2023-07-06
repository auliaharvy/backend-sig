const query = ({ connects, models, bcrypt }) => {
  return Object.freeze({
    registerUsers,
    loginUsers,
    checkNameExist,
    selectAll,
    selectOne,
    checkNameExistUpdate,
    patchUser,
    deleteUser,
  });

  async function deleteUser({ id }) {
    try {
      // use sequelize on inserting
      const User = models.Users;
      const res = await User.update(
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

  async function registerUsers({ data }) {
    try {
      // use sequelize on inserting
      const User = models.Users;
      const res = await User.create(data);
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function loginUsers({ data }) {
    try {
      // use sequelize on inserting
      const User = models.Users;
      //const res = await User.create(data);

      const user = await User.findOne({
        where: {
          username: data.username,
        },
      });

      if (!user) {
        res = {
          httpCode: 400,
          data: {
            status: "error",
            message: "Account not found",
          },
        };
        return res;
      }

      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) {
        res = {
          httpCode: 401,
          data: {
            status: "error",
            message: "Password is incorrect",
          },
        };
        return res;
      }

      const pool = await connects();

      const resRole = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name AS role_name, c.name AS company_name, ARRAY_AGG(e.name) AS permissions,
        f.name as organization_name, f.id as organization_id, g.name as company_type, g.id as company_type_id
        FROM "user_has_role" AS a
        JOIN "roles" AS b ON a."role_id" = b.id
        JOIN "mst_companies" AS c ON a."company_id" = c.id
        LEFT JOIN "role_has_permission" AS d ON a."role_id" = d.id_role
        LEFT JOIN "permissions" AS e ON d."id_permission" = e.id
        LEFT JOIN "mst_organization" AS f ON c."id_organization" = f.id
        LEFT JOIN "mst_company_type" AS g ON c."id_company_type" = g.id
        WHERE a."user_id" = $1
        GROUP BY a.role_id , a.user_id , a.company_id, b.id, c.id, f.id, g.id;`;
        const params = [user.id];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });
      // //(user);

      var names = user.fullname.split(" ");
      var initials = "";
      if (names.length == 1) {
        initials = names[0][0].toUpperCase();
      }
      if (names.length == 2) {
        initials =
          names[0][0].toUpperCase() + "." + names[1][0].toUpperCase();
      }
      if (names.length >= 3) {
        initials =
          names[0][0].toUpperCase() +
          "." +
          names[1][0].toUpperCase() +
          "." +
          names[2][0].toUpperCase();
      }

      res = {
        httpCode: 200,
        data: {
          status: "success",
          message: "Login SuccessFull",
          data: {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            initials: initials,
            email: user.email,
            role: resRole.rows,
            ip: data.ip,
            device: data.device,
            time_access: Date(),
          },
        },
      };
      return res;
      // return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function checkNameExist({ data }) {
    try {
      const pool = await connects();

      const { username, email } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "users" WHERE "username" = $1 AND "email" = $2;`;
        const params = [username, email];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });
      //(res);
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function selectAll({}) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, jsonb_agg    ( json_build_object('role', c."name", 'company', d."name" )) as roles
        FROM "users" AS a
        LEFT JOIN "user_has_role" AS b ON b."user_id" = a.id
        LEFT JOIN "roles" AS c ON c."id" = b.role_id
        LEFT JOIN "mst_companies" AS d ON d."id" = b.company_id
        GROUP BY a.id;`;
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
        const sql = `SELECT a.*, jsonb_agg    ( json_build_object('role', c."name", 'company', d."name" )) as roles
        FROM "users" AS a
        LEFT JOIN "user_has_role" AS b ON b."user_id" = a.id
        LEFT JOIN "roles" AS c ON c."id" = b.role_id
        LEFT JOIN "mst_companies" AS d ON d."id" = b.company_id
        WHERE a.id = $1
        GROUP BY a.id
        ;`;
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

  async function checkNameExistUpdate({ data }) {
    try {
      const pool = await connects();

      const { firstName, lastName, id } = data; // deconstruct

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
      //("Error: ", e);
    }
  }

  async function patchUser({ data }) {
    try {
      // use sequelize on update

      const User = models.Users;
      // const password = await bcrypt.hash(data.password, 10);
      const res = await User.update(
        {
          fullname: data.fullname,
          username: data.username,
          email: data.email,
          // password: password,
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
};

module.exports = query;

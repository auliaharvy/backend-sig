const query = ({ connects, models, bcrypt }) => {
  return Object.freeze({
    registerUsers,
    loginUsers,
    checkNameExist,
    selectAll,
    selectOne,
    checkNameExistUpdate,
    patchEmployee,
    deleteEmployee,
  });

  async function deleteEmployee({ id }) {
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

  async function registerUsers({ data }) {
    try {
      // use sequelize on inserting
      const User = models.Users;
      const res = await User.create(data);
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function loginUsers({ data }) {
    try {
      // use sequelize on inserting
      const User = models.Users;
      //const res = await User.create(data);

      const user = await User.findOne({
        where: {email: data.email}
    });

    if(!user) {
      res = {
        httpCode : 400,
        data : {
          status: 'error',
          message: 'Account not found'
        }
        
      };
      return res;
    }

      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) {
        res = {
          httpCode : 401,
          data : {
            status: 'error',
            message: 'Password is incorrect'
          }
          
        };
        return res;
      }

      res = {
        httpCode : 200,
        data : {
          status: 'success',
          message: 'Login SuccessFull',
          data: {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
          },
        }
       
      };
      return res;
      // return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function checkNameExist({ data }) {
    try {
      const pool = await connects();

      const { username, fullname } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "Users" WHERE "username" = $1 AND "fullname" = $2;`;
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

  async function selectAll({ }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "Employees";`;
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

  async function selectOne({ id }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "Employees" WHERE id = $1;`;
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

  async function checkNameExistUpdate({ data }) {
    try {
      const pool = await connects();

      const { firstName, lastName, id } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "Employees" WHERE "firstName" = $1 AND id <> $3 AND "lastName" = $2 AND id <> $3;`;
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

  async function patchEmployee({ data }) {
    try {
      // use sequelize on update
      const Employee = models.Employees;
      const res = await Employee.update(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }
};

module.exports = query;
const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    checkDistributorExist,
    insertDistributor,
    selectAll,
    selectOne,
    checkDistributorExistUpdate,
    patchDistributor,
    deleteDistributor
  });

  async function insertDistributor({
    data
  }) {
    try {
      // use sequelize on inserting
      const distributor = models.Distributors;
      const res = await distributor.create(data);
      return res;
    } catch (e) {
      return e;
    }
  }

  async function checkDistributorExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_distributors" WHERE "name" = $1;`;
        const params = [name];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      return e;
    }
  }

  async function selectAll({}) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_distributors";`;
        pool.query(sql, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      return e;
    }
  }

  async function selectOne({
    id
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_distributors" WHERE id = $1;`;
        const params = [id];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      return e;
    }
  }

  async function checkDistributorExistUpdate({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
        id
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_distributors" WHERE "name" = $1 AND id <> $2 ;`;
        const params = [name, id];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });

      return res;
    } catch (e) {
      return e;
    }
  }

  async function patchDistributor({
    data
  }) {
    try {
      // use sequelize on update
      const distributor = models.Distributors;
      const res = await distributor.update({
        name: data.name,
        code: data.code,
      }, {
        where: {
          id: data.id,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  }

  async function deleteDistributor({
    id
  }) {
    try {
      // use sequelize on inserting
      const distributor = models.Distributors;
      const res = await distributor.destroy({
        where: {
          id,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  }


};

module.exports = query;
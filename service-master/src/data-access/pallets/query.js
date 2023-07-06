const query = ({
  connects,
  models
}) => {
  return Object.freeze({
    checkPalletExist,
    insertPallet,
    selectAll,
    selectOne,
    checkPalletExistUpdate,
    patchPallet,
    deletePallet,

  });


  async function checkPalletExist({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_pallet" WHERE "name" = $1;`;
        const params = [name];
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
  async function insertPallet({
    data
  }) {
    try {
      // use sequelize on inserting
      const Pallet = models.Pallets;
      const res = await Pallet.create(data);
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }


  async function selectAll({}) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_pallet" WHERE is_deleted = 0;`;
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

  async function selectOne({
    id
  }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_pallet" WHERE id = $1 AND is_deleted = 0;`;
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

  async function checkPalletExistUpdate({
    data
  }) {
    try {
      const pool = await connects();

      const {
        name,
        id
      } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_pallet" WHERE "name" = $1 AND id <> $2 ;`;
        const params = [name, id];
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

  async function patchPallet({
    data
  }) {
    try {
      // use sequelize on update
      const Pallet = models.Pallets;
      const res = await Pallet.update({
        name: data.name,
        updated_by: data.updated_by,
      }, {
        where: {
          id: data.id,
        },
      });
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function deletePallet({
    id
  }) {
    try {
      // use sequelize on inserting
      const Pallet = models.Pallets;
      const res = await Pallet.update({
        is_deleted: 1
      }, {
        where: {
          id,
        },
      });
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }



};

module.exports = query;
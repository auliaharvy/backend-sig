const query = ({ connects, models }) => {
  return Object.freeze({
    checkTruckExist,
    insertTruck,
    bulkInsertTruck,
    selectAll,
    selectOne,
    checkTruckExistUpdate,
    patchTruck,
    deleteTruck,
  });

  async function insertTruck({ data }) {
    try {
      // use sequelize on inserting
      const Truck = models.Trucks;
      const res = await Truck.create(data);

      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function bulkInsertTruck(data) {
    try {
      // use sequelize on inserting
      const Truck = models.Trucks;
      const res = await Truck.bulkCreate(data, {
        fields: ['license_plate', 'id_company', 'createdBy', 'updatedBy', 'transporter_code'],
        ignoreDuplicates: true,
      });

      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function checkTruckExist({ data }) {
    try {
      const pool = await connects();

      const { license_plate } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_truck" WHERE "license_plate" = $1;`;
        const params = [license_plate];
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

  async function selectAll({}) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as company_name
        FROM "mst_truck" as a
        LEFT JOIN "mst_companies" as b ON a."transporter_code" = b.code;`;
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
        const sql = `SELECT a.*, b.name as company_name
        FROM "mst_truck" as a
        LEFT JOIN "mst_companies" as b ON a."transporter_code" = b.code
        WHERE a.id=$1;`;
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

  async function checkTruckExistUpdate({ data }) {
    try {
      const pool = await connects();

      const { license_plate, id } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "mst_truck" WHERE "license_plate" = $1 AND id <> $2 ;`;
        const params = [license_plate, id];
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

  async function patchTruck({ data }) {
    try {
      // use sequelize on update
      const Truck = models.Trucks;
      const res = await Truck.update(
        {
          license_plate: data.license_plate,
          transporter_code: data.transporter_code,
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

  async function deleteTruck({ id }) {
    try {
      // use sequelize on inserting
      const Truck = models.Trucks;
      const res = await Truck.update(
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
};

module.exports = query;

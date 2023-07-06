const query = ({ connects, models }) => {
  return Object.freeze({
    insertNew,
    checkTrxNumberExist,
    getTrxNumber,
    selectAll,
    exportAll,
    selectOne,
    deleteItem,
    approvalDistributor,
    updateNewPallet,
    getPalletQuantity,
    approvalManager
  });

  async function deleteItem({ id }) {
    try {
      // use sequelize on inserting
      const DamagedPallet = models.DamagedPallets;
      const res = await DamagedPallet.update(
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

  async function approvalManager({ data }) {
    try {
      // use sequelize on inserting
      const SewaPallet = models.SewaPallets;
      const res = await SewaPallet.update(
        {
          id_user_manager: data.id_user_manager,
          status: data.status,
          reason_manager: data.reason_manager,
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

  async function approvalDistributor({ data }) {
    try {
      // use sequelize on inserting
      const SewaPallet = models.SewaPallets
      const res = await SewaPallet.update(
        {
          status: data.status,
          id_user_distributor: data.id_user_distributor,
          reason_distributor: data.reason_distributor,
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

  async function updateNewPallet({ data }) {
    try {
      const pool = await connects();

      // get data master pallet
      const mstPallets = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_pallet" WHERE is_deleted = 0;`;
        pool.query(sql, (err, res) => {
          if (err) resolve(err);
          resolve(res.rows);
        });
      });

      // update data qty pallet at company
      for (const mstPallet of mstPallets) {
        const quantityPallet = await new Promise((resolve) => {
          const sql = `SELECT b.name as kondisi_pallet , a.quantity
              FROM "mst_pallet_mst_companies" as a
              JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
              WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
          const params = [data.id_company, mstPallet.id];
          pool.query(sql, params, (err, res) => {
            if (err) resolve(err);
            resolve(res);
          });
        });

        var dataPalletCompany = {
          mst_pallet_id: mstPallet.id,
          mst_companies_id: data.id_company,
          quantity: quantityPallet.rows[0].quantity,
          quantityNew: 0,
        };
        if (mstPallet.name == "Good Pallet") {
          dataPalletCompany.quantityNew =
            parseInt(dataPalletCompany.quantity) -
            parseInt(data.qty_tbr_pallet);
        }
        if (mstPallet.name == "TBR Pallet") {
          dataPalletCompany.quantityNew =
            parseInt(dataPalletCompany.quantity) +
            parseInt(data.qty_tbr_pallet);
        }
        if (mstPallet.name == "BER Pallet") {
          dataPalletCompany.quantityNew = parseInt(dataPalletCompany.quantity)
        }
        if (mstPallet.name == "Missing Pallet") {
          dataPalletCompany.quantityNew = parseInt(dataPalletCompany.quantity)
        }
        
        const CompanyPallet = models.CompaniesPallet;
        const updateWorkshopPalletQty = await CompanyPallet.update(
          {
            quantity: dataPalletCompany.quantityNew,
          },
          {
            where: {
              mst_companies_id: dataPalletCompany.mst_companies_id,
              mst_pallet_id: dataPalletCompany.mst_pallet_id,
            },
          }
        );
      }
      pool.end(); // end connection

      return 'success';
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function insertNew({ data }) {
    try {
      // use sequelize on inserting
      const DamagedPallet = models.DamagedPallets;
      const res = await DamagedPallet.create(data);

      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function getTrxNumber() {
    try {
      const pool = await connects();

      // get month and year
      const d = new Date();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      var formatedMonth;
      if (month != "10" || month != "11" || month != "12") {
        formatedMonth = "0" + month;
      } else {
        formatedMonth = month;
      }

      // query trx number
      const res = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
        const params = ["DP", formatedMonth, year];
        pool.query(sql, params, (err, res) => {
          if (err) resolve(err);
          resolve(res);
        });
      });

      if (res.rowCount > 0) {
        //(res);
        return res;
      } else {
        // create txr number if not exist
        const TrxNumber = models.TrxNumbers;
        const resAdd = await TrxNumber.create({
          trx_type: "DP",
          code: "9",
          month: formatedMonth,
          year: year,
          increment_number: 0,
        });

        // query trx number
        const res = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
          const params = ["DP", formatedMonth, year];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection

            if (err) resolve(err);
            resolve(res);
          });
        });
        return res;
      }
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function checkTrxNumberExist({ data }) {
    try {
      const pool = await connects();

      const { firstName, lastName } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT id FROM "Employees" WHERE "firstName" = $1 AND "lastName" = $2;`;
        const params = [firstName, lastName];
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
        const sql = `SELECT a.*, b.name as company_name, c.username as reporter_name
          FROM "trx_damaged_pallet" as a
          JOIN "mst_companies" as b ON a."id_company" = b.id
          LEFT JOIN "users" as c ON a."id_user_reporter" = c.id
          WHERE a.is_deleted = 0
          ORDER BY a.created_at DESC`;
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

  async function exportAll({from, to}) {
    try {
      const pool = await connects();

      
      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as company_name, c.username as reporter_name
        FROM "trx_damaged_pallet" as a
        JOIN "mst_companies" as b ON a."id_company" = b.id
        LEFT JOIN "users" as c ON a."id_user_reporter" = c.id
        WHERE a.is_deleted = 0 AND a.created_at >= $1 AND a.created_at < $2
        ORDER BY a.created_at DESC`;
        const params = [from, to];
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

  async function selectOne({ id }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as company_name, c.username as reporter_name
        FROM "trx_damaged_pallet" as a
        JOIN "mst_companies" as b ON a."id_company" = b.id
        LEFT JOIN "users" as c ON a."id_user_reporter" = c.id
        WHERE a.is_deleted = 0 AND a.id = $1
        ORDER BY a.created_at DESC`;
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

  async function getPalletQuantity(id) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT b.name as kondisi_pallet , a.quantity
        FROM "trx_pengajuan_sewa_mst_pallet" as a
        JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
        WHERE a.trx_pengajuan_sewa_id = $1;`;
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
};


module.exports = query;

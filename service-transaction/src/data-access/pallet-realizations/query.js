const query = ({ connects, models }) => {
  return Object.freeze({
    insertNew,
    checkTrxNumberExist,
    getTrxNumber,
    selectAll,
    exportAll,
    selectOne,
    deleteItem,
    approval,
    updateNewPallet,
  });

  async function deleteItem({ id }) {
    try {
      // use sequelize on inserting
      const NewPallet = models.NewPallets;
      const res = await NewPallet.update(
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

  async function approval({ data }) {
    try {
      // use sequelize on inserting
      const NewPallet = models.NewPallets;
      const res = await NewPallet.update(
        {
          status: data.status,
          approved_quantity: data.approved_quantity,
          updated_by: data.updatedBy,
        },
        {
          where: {
            id: data.id,
          },
        }
      );

      const pool = await connects();

      const queryCompany = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as name_organization , c.name as name_company_type 
          FROM "mst_companies" as a
          JOIN "mst_organization" as b ON a."id_organization" = b.id
          JOIN "mst_company_type" as c ON a."id_company_type" = c.id
          WHERE a.is_deleted = 0 AND a.id = $1;`;
        const params = [data.id_company_requester];
        pool.query(sql, params, (err, res) => {
          pool.end(); // end connection

          if (err) resolve(err);
          resolve(res);
        });
      });
      const palletQuota = queryCompany.rows[0].pallet_quota;
      if (data.status == 1) {
        if (data.type == 1) {
          const Company = models.Companies;
          const updateQuota = await Company.update(
            {
              pallet_quota: palletQuota - data.approved_quantity,
            },
            {
              where: {
                id: data.id_company_requester,
              },
            }
          );
        } else {
          const Company = models.Companies;
          const updateQuota = await Company.update(
            {
              pallet_quota: palletQuota + data.approved_quantity,
            },
            {
              where: {
                id: data.id_company_requester,
              },
            }
          );
        }
      }
      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function updateNewPallet({ data }) {
    try {
      const pool = await connects();

      // update ready pallet at new pallet
      const trxNewPallet = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as company_name,
          c.trx_number as no_change_quota
          FROM "trx_new_pallet" as a
          JOIN "mst_companies" as b ON a."id_company_workshop" = b.id
          LEFT JOIN "trx_change_quota" as c ON a."id_trx_change_quota" = c.id
          WHERE a.is_deleted = 0 AND a.id = $1
          ORDER BY a.created_at DESC`;
        const params = [data.id_trx_new_pallet];
        pool.query(sql, params, (err, res) => {
          if (err) resolve(err);
          resolve(res);
        });
      });

      // get data master pallet
      const mstPallets = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_pallet" WHERE is_deleted = 0;`;
        pool.query(sql, (err, res) => {
          if (err) resolve(err);
          resolve(res.rows);
        });
      });

      // update data sending

      // update data departure company
      for (const mstPallet of mstPallets) {
        const quantityPallet = await new Promise((resolve) => {
          const sql = `SELECT b.name as kondisi_pallet , a.quantity
              FROM "mst_pallet_mst_companies" as a
              JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
              WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
          const params = [trxNewPallet.rows[0].id_company_workshop, mstPallet.id];
          pool.query(sql, params, (err, res) => {
            if (err) resolve(err);
            resolve(res);
          });
        });

        var dataPalletCompanyWorkshop = {
          mst_pallet_id: mstPallet.id,
          mst_companies_id: trxNewPallet.rows[0].id_company_workshop,
          quantity: quantityPallet.rows[0].quantity,
          quantityNew: 0,
        };
        if (mstPallet.name == "Good Pallet") {
          dataPalletCompanyWorkshop.quantityNew =
            parseInt(dataPalletCompanyWorkshop.quantity) +
            parseInt(data.qty_pallet);
        }
        
        const WorkshopCompanyPallet = models.CompaniesPallet;
        const updateWorkshopPalletQty = await WorkshopCompanyPallet.update(
          {
            quantity: dataPalletCompanyWorkshop.quantityNew,
          },
          {
            where: {
              mst_companies_id: dataPalletCompanyWorkshop.mst_companies_id,
              mst_pallet_id: dataPalletCompanyWorkshop.mst_pallet_id,
            },
          }
        );
      }
      pool.end(); // end connection

      var status;
      var jumlahPallet = parseInt(trxNewPallet.rows[0].qty_ready_pallet) + parseInt(data.qty_pallet);
      var jumlahPermintaanPallet = parseInt(trxNewPallet.rows[0].qty_request_pallet);
      //(jumlahPallet);
      //(jumlahPermintaanPallet);
      if (jumlahPallet == jumlahPermintaanPallet) {
        status = 2;
      } else {
        status = 1;
      }
      // update ready pallet 
      const NewPallet = models.NewPallets;
      const res = await NewPallet.update(
        {
          qty_ready_pallet: parseInt(trxNewPallet.rows[0].qty_ready_pallet) + parseInt(data.qty_pallet),
          status: status,
        },
        {
          where: {
            id: trxNewPallet.rows[0].id,
          },
        }
      );

      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function insertNew({ data }) {
    try {
      // use sequelize on inserting
      const PalletRealization = models.PalletRealizations;
      const res = await PalletRealization.create(data);

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
        const params = ["NPR", formatedMonth, year];
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
          trx_type: "NPR",
          code: "6",
          month: formatedMonth,
          year: year,
          increment_number: 0,
        });

        // query trx number
        const res = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
          const params = ["NPR", formatedMonth, year];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection

            if (err) resolve(err);
            resolve(res);
          });
        });
        //(res);
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
        const sql = `SELECT a.*, b.trx_number as no_new_pallet
          FROM "trx_new_pallet_realisation" as a
          JOIN "trx_new_pallet" as b ON a."id_trx_new_pallet" = b.id
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
        const sql = `SELECT a.*, b.trx_number as no_new_pallet
        FROM "trx_new_pallet_realisation" as a
        JOIN "trx_new_pallet" as b ON a."id_trx_new_pallet" = b.id
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
        const sql = `SELECT a.*, b.trx_number as no_new_pallet
        FROM "trx_new_pallet_realisation" as a
        JOIN "trx_new_pallet" as b ON a."id_trx_new_pallet" = b.id
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
};

module.exports = query;

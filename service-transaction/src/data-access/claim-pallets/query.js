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
    checkCompanyQty,
    approvalManager,
    editData
  });

  async function checkCompanyQty({ data }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT b.name as kondisi_pallet , a.quantity
        FROM "mst_pallet_mst_companies" as a
        JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
        WHERE a.mst_companies_id = $1;`;
        const params = [data.id_company_distributor];
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

  async function deleteItem({ id }) {
    try {
      // use sequelize on inserting
      const ClaimPallet = models.ClaimPallets;
      const res = await ClaimPallet.update(
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

  async function editData({ data }) {
    try {
      // use sequelize on inserting
      const ClaimPallet = models.ClaimPallets;
      const res = await ClaimPallet.update(
        {
          price: data.price,
        },
        {
          where: {
            id: data.id,

          },
        }
      );

      const pool = await connects();

        const mstPallets = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_pallet" WHERE is_deleted = 0;`;
          pool.query(sql, (err, res) => {
            pool.end(); // end connection

            if (err) resolve(err);
            resolve(res.rows);
          });
        });
        
        for (const mstPallet of mstPallets) {
          var dataPalletinClaim = {
            'mst_pallet_id': mstPallet.id,
            'trx_claim_pallet_id': data.id,
            'quantity': 0
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletinClaim.quantity = data.ber_pallet
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletinClaim.quantity = data.missing_pallet
          }

          const palletPalletClaim = models.ClaimPalletPallets;
          const updatePalletQty = await palletPalletClaim.update(
            {
              quantity: dataPalletinClaim.quantity,
            },
            {
              where: {
                trx_claim_pallet_id: dataPalletinClaim.trx_claim_pallet_id,
                mst_pallet_id: dataPalletinClaim.mst_pallet_id,
              },
            }
          );
          
        }

      return res;
    } catch (e) {
      //("Error: ", e);
    }
  }

  async function approvalManager({ data }) {
    try {
      // use sequelize on inserting
      const ClaimPallet = models.ClaimPallets;
      const res = await ClaimPallet.update(
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
      const ClaimPallet = models.ClaimPallets
      const res = await ClaimPallet.update(
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

      if (data.status == 3) {
        const pool = await connects();
        // get data master pallet
        const mstPallets = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_pallet" WHERE is_deleted = 0;`;
          pool.query(sql, (err, res) => {
            if (err) resolve(err);
            resolve(res.rows);
          });
        });

        // update data sending

        // update data quantity company
        for (const mstPallet of mstPallets) {
          const quantityPallet = await new Promise((resolve) => {
            const sql = `SELECT b.name as kondisi_pallet , a.quantity
                FROM "mst_pallet_mst_companies" as a
                JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
                WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
            const params = [data.id_company_distributor, mstPallet.id];
            pool.query(sql, params, (err, res) => {
              if (err) resolve(err);
              resolve(res);
            });
          });

          var dataPalletCompany = {
            mst_pallet_id: mstPallet.id,
            mst_companies_id: data.id_company_distributor,
            quantity: quantityPallet.rows[0].quantity,
            quantityNew: 0,
          };
          if (mstPallet.name == "BER Pallet") {
            dataPalletCompany.quantityNew =
              parseInt(dataPalletCompany.quantity) -
              parseInt(data.ber_pallet);
          }
          if (mstPallet.name == "Missing Pallet") {
            dataPalletCompany.quantityNew =
              parseInt(dataPalletCompany.quantity) -
              parseInt(data.missing_pallet);
          }
          if (mstPallet.name == "Good Pallet") {
            dataPalletCompany.quantityNew = dataPalletCompany.quantity;
          }
          if (mstPallet.name == "Tbr Pallet") {
            dataPalletCompany.quantityNew = dataPalletCompany.quantity;
          }
          
          const CompanyPallet = models.CompaniesPallet;
          const updatePalletQty = await CompanyPallet.update(
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

      // update ready pallet 
      const NewPallet = models.NewPallets;
      const res = await NewPallet.update(
        {
          qty_ready_pallet: trxNewPallet.rows[0].qty_ready_pallet + data.qty_pallet,
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
      const ClaimPallet = models.ClaimPallets;
      const res = await ClaimPallet.create(data);
      const idClaimPallet = res.id;

      const pool = await connects();

        const mstPallets = await new Promise((resolve) => {
        const sql = `SELECT * FROM "mst_pallet" WHERE is_deleted = 0;`;
          pool.query(sql, (err, res) => {
            pool.end(); // end connection

            if (err) resolve(err);
            resolve(res.rows);
          });
        });
        
        for (const mstPallet of mstPallets) {
          var dataPalletinClaim = {
            'mst_pallet_id': mstPallet.id,
            'trx_claim_pallet_id': idClaimPallet,
            'quantity': 0
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletinClaim.quantity = data.ber_pallet
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletinClaim.quantity = data.missing_pallet
          }
          
          // tambah quantity pallet untuk claim pallet
          const palletPalletClaim = models.ClaimPalletPallets;
          const res = await palletPalletClaim.create(dataPalletinClaim);
        }

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
        const params = ["CP", formatedMonth, year];
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
          trx_type: "CP",
          code: "7",
          month: formatedMonth,
          year: year,
          increment_number: 0,
        });

        // query trx number
        const res = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
          const params = ["CP", formatedMonth, year];
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
        const sql = `SELECT a.*, b.name as company_name, c.username as manager_name,
          d.username as pic_distributor
          FROM "trx_claim_pallet" as a
          JOIN "mst_companies" as b ON a."id_company_distributor" = b.id
          LEFT JOIN "users" as c ON a."id_user_manager" = c.id
          LEFT JOIN "users" as d ON a."id_user_distributor" = d.id
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
        const sql = `SELECT a.*, b.name as company_name, c.username as manager_name,
        d.username as pic_distributor
        FROM "trx_claim_pallet" as a
        JOIN "mst_companies" as b ON a."id_company_distributor" = b.id
        LEFT JOIN "users" as c ON a."id_user_manager" = c.id
        LEFT JOIN "users" as d ON a."id_user_distributor" = d.id
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
        const sql = `SELECT a.*, b.name as company_name, c.fullname as manager_name, c.email as manager_email,
          d.username as pic_distributor, b.email as company_email
          FROM "trx_claim_pallet" as a
          JOIN "mst_companies" as b ON a."id_company_distributor" = b.id
          LEFT JOIN "users" as c ON a."id_user_manager" = c.id
          LEFT JOIN "users" as d ON a."id_user_distributor" = d.id
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
        FROM "trx_claim_pallet_mst_pallet" as a
        JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
        WHERE a.trx_claim_pallet_id = $1;`;
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

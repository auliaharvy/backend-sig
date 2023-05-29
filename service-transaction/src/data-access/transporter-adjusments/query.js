const query = ({ connects, models }) => {
  return Object.freeze({
    insertNew,
    checkTrxNumberExist,
    getTrxNumber,
    selectAll,
    selectOne,
    deleteItem,
    approvalManager,
    checkCompany,
    checkQty,
    updatePalletQty,
    getPalletQuantity
  });

  async function deleteItem({ id }) {
    try {
      // use sequelize on inserting
      const RepairedPallet = models.RepairedPallets;
      const res = await RepairedPallet.update(
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
      console.log("Error: ", e);
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
      console.log("Error: ", e);
    }
  }

  async function insertNew({ data }) {
    try {
      // use sequelize on inserting
      const transporterAdjusment = models.TransporterAdjusments;
      const res = await transporterAdjusment.create(data);
      const idTransporterAdjusment = res.id;

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
          var dataPalletinAdjusment = {
            'mst_pallet_id': mstPallet.id,
            'trx_transporter_adjusment_id': idTransporterAdjusment,
            'quantity': 0
          }
          if (mstPallet.name == 'Good Pallet') {
            dataPalletinAdjusment.quantity = data.good_pallet
          }
          if (mstPallet.name == 'TBR Pallet') {
            dataPalletinAdjusment.quantity = data.tbr_pallet
          }
          
          // tambah quantity pallet untuk claim pallet
          const palletTransporterAdjusment = models.TransporterAdjusmentPallets;
          const res = await palletTransporterAdjusment.create(dataPalletinAdjusment);
        }

      return res;
    } catch (e) {
      console.log("Error: ", e);
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
        const params = ["TA", formatedMonth, year];
        pool.query(sql, params, (err, res) => {
          if (err) resolve(err);
          resolve(res);
        });
      });

      if (res.rowCount > 0) {
        console.log(res);
        return res;
      } else {
        // create txr number if not exist
        const TrxNumber = models.TrxNumbers;
        const resAdd = await TrxNumber.create({
          trx_type: "TA",
          code: "11",
          month: formatedMonth,
          year: year,
          increment_number: 0,
        });

        // query trx number
        const res = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
          const params = ["TA", formatedMonth, year];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection

            if (err) resolve(err);
            resolve(res);
          });
        });
        return res;
      }
    } catch (e) {
      console.log("Error: ", e);
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
      console.log("Error: ", e);
    }
  }

  async function selectAll({}) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as transporter_name, c.name as company_name,d.username as reporter_name
        FROM "trx_transporter_adjusment" as a
        JOIN "mst_companies" as b ON a."id_company_transporter" = b.id
        JOIN "mst_companies" as c ON a."id_company" = c.id
        LEFT JOIN "users" as d ON a."id_user_reporter" = d.id
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
      console.log("Error: ", e);
    }
  }

  async function selectOne({ id }) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as company_name, c.username as reporter_name
        FROM "trx_repaired_pallet" as a
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
      console.log("Error: ", e);
    }
  }

  async function checkCompany({ data }) {
    try {
      const pool = await connects();

      const { id_company_transporter } = data; // deconstruct

      const res = await new Promise((resolve) => {
        const sql = `SELECT a.*, b.name as name_organization , c.name as name_company_type 
        FROM "mst_companies" as a
        JOIN "mst_organization" as b ON a."id_organization" = b.id
        JOIN "mst_company_type" as c ON a."id_company_type" = c.id
        WHERE a.is_deleted = 0 AND a.id = $1;`;
        const params = [id_company_transporter];
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

  async function checkQty({ data }) {
    try {
      var idCompany;
      if (data.is_from_pool == 0) {
        idCompany = data.id_company_transporter
      }
      if (data.is_from_pool == 1) {
        idCompany = data.id_company
      }
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT b.name as kondisi_pallet , a.quantity
        FROM "mst_pallet_mst_companies" as a
        JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
        WHERE a.mst_companies_id = $1;`;
        const params = [idCompany];
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

  async function updatePalletQty({ data }) {
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

      // update data quantity
      // update data origin company
      for (const mstPallet of mstPallets) {
        const quantityPallet = await new Promise((resolve) => {
          const sql = `SELECT b.name as kondisi_pallet , a.quantity
          FROM "mst_pallet_mst_companies" as a
          JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
          WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
          const params = [data.id_company_transporter, mstPallet.id];
          pool.query(sql, params, (err, res) => {
            if (err) resolve(err);
            resolve(res);
          });
        });

        var dataPalletCompanyOrigin = {
          'mst_pallet_id': mstPallet.id,
          'mst_companies_id': data.id_company_transporter,
          'quantity': quantityPallet.rows[0].quantity,
          'quantityNew': 0
        }
        if (mstPallet.name == 'Good Pallet') {
          if (data.is_from_pool == 0) {
            dataPalletCompanyOrigin.quantityNew = parseInt(dataPalletCompanyOrigin.quantity) - parseInt(data.good_pallet)
          }
          if (data.is_from_pool == 1) {
            dataPalletCompanyOrigin.quantityNew = parseInt(dataPalletCompanyOrigin.quantity) + parseInt(data.good_pallet)
          }
        }
        if (mstPallet.name == 'TBR Pallet') {
          if (data.is_from_pool == 0) {
            dataPalletCompanyOrigin.quantityNew = parseInt(dataPalletCompanyOrigin.quantity) - parseInt(data.tbr_pallet)
          }
          if (data.is_from_pool == 1) {
            dataPalletCompanyOrigin.quantityNew = parseInt(dataPalletCompanyOrigin.quantity) + parseInt(data.tbr_pallet)
          }
        }
        if (mstPallet.name == 'BER Pallet') {
          if (data.is_from_pool == 0) {
            dataPalletCompanyOrigin.quantityNew = parseInt(dataPalletCompanyOrigin.quantity) - parseInt(data.ber_pallet)
          }
          if (data.is_from_pool == 1) {
            dataPalletCompanyOrigin.quantityNew = parseInt(dataPalletCompanyOrigin.quantity) + parseInt(data.ber_pallet)
          }
        }
        if (mstPallet.name == 'Missing Pallet') {
          if (data.is_from_pool == 0) {
            dataPalletCompanyOrigin.quantityNew = parseInt(dataPalletCompanyOrigin.quantity) - parseInt(data.missing_pallet)
          }
          if (data.is_from_pool == 1) {
            dataPalletCompanyOrigin.quantityNew = parseInt(dataPalletCompanyOrigin.quantity) + parseInt(data.missing_pallet)
          }
        }
        
        const OriginCompanyPallet = models.CompaniesPallet;
        const updateOriginPalletQty = await OriginCompanyPallet.update(
          {
            quantity: dataPalletCompanyOrigin.quantityNew,
          },
          {
            where: {
              mst_companies_id: dataPalletCompanyOrigin.mst_companies_id,
              mst_pallet_id: dataPalletCompanyOrigin.mst_pallet_id,
            },
          }
        );
      }

      // update data to company
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

        var dataPalletCompanyTo = {
          'mst_pallet_id': mstPallet.id,
          'mst_companies_id': data.id_company,
          'quantity': quantityPallet.rows[0].quantity,
          'quantityNew': 0
        }
        if (mstPallet.name == 'Good Pallet') {
          if (data.is_from_pool == 0) {
            dataPalletCompanyTo.quantityNew = parseInt(dataPalletCompanyTo.quantity) + parseInt(data.good_pallet)
          }
          if (data.is_from_pool == 1) {
            dataPalletCompanyTo.quantityNew = parseInt(dataPalletCompanyTo.quantity) - parseInt(data.good_pallet)
          }
        }
        if (mstPallet.name == 'TBR Pallet') {
          if (data.is_from_pool == 0) {
            dataPalletCompanyTo.quantityNew = parseInt(dataPalletCompanyTo.quantity) + parseInt(data.tbr_pallet)
          }
          if (data.is_from_pool == 1) {
            dataPalletCompanyTo.quantityNew = parseInt(dataPalletCompanyTo.quantity) - parseInt(data.tbr_pallet)
          }
        }
        if (mstPallet.name == 'BER Pallet') {
          if (data.is_from_pool == 0) {
            dataPalletCompanyTo.quantityNew = parseInt(dataPalletCompanyTo.quantity) + parseInt(data.ber_pallet)
          }
          if (data.is_from_pool == 1) {
            dataPalletCompanyTo.quantityNew = parseInt(dataPalletCompanyTo.quantity) - parseInt(data.ber_pallet)
          }
        }
        if (mstPallet.name == 'Missing Pallet') {
          if (data.is_from_pool == 0) {
            dataPalletCompanyTo.quantityNew = parseInt(dataPalletCompanyTo.quantity) + parseInt(data.missing_pallet)
          }
          if (data.is_from_pool == 1) {
            dataPalletCompanyTo.quantityNew = parseInt(dataPalletCompanyTo.quantity) - parseInt(data.missing_pallet)
          }
          
        }
        
        const ToCompanyPallet = models.CompaniesPallet;
        const updateToPalletQty = await ToCompanyPallet.update(
          {
            quantity: dataPalletCompanyTo.quantityNew,
          },
          {
            where: {
              mst_companies_id: dataPalletCompanyTo.mst_companies_id,
              mst_pallet_id: dataPalletCompanyTo.mst_pallet_id,
            },
          }
        );
      }
      pool.end();

      return 'success update pallet';
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function getPalletQuantity(id) {
    try {
      const pool = await connects();

      const res = await new Promise((resolve) => {
        const sql = `SELECT b.name as kondisi_pallet , a.quantity
        FROM "trx_transporter_adjusment_mst_pallet" as a
        JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
        WHERE a.trx_transporter_adjusment_id = $1;`;
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
};


module.exports = query;

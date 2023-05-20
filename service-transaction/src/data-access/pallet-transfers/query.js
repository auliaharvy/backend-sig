const query = ({ connects, models }) => {
    return Object.freeze({
      insertNewPalletTransfer,
      checkTrxNumberExist,
      checkTruck,
      getTrxNumber,
      selectAll,
      selectOne,
      checkNameExistUpdate,
      deletePalletTransfer,
      approval,
      sending,
      updatePalletQtySending,
      receiving,
      updatePalletQtyReceiving,
      getPalletQuantity,
    });

    async function getPalletQuantity(id) {
      try {
        const pool = await connects();
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT b.name as kondisi_pallet , a.quantity
          FROM "trx_pallet_transfer_mst_pallet" as a
          JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
          WHERE a.trx_pallet_transfer_id = $1;`;
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
  
    async function deletePalletTransfer({ id }) {
      try {
        // use sequelize on inserting
        const PalletTransfer = models.PalletTransfers;
        const res = await PalletTransfer.update(
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

    async function approval({ data }) {
      try {
        // use sequelize on inserting
        const PalletTransfer = models.PalletTransfers;
        const res = await PalletTransfer.update(
          {
            note: data.note,
            status: data.status,
            id_user_approver: data.id_user_approver,
            updated_by: data.updatedBy,
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

    async function sending({ data }) {
      try {
        // use sequelize on inserting
        const PalletTransfer = models.PalletTransfers;
        const res = await PalletTransfer.update(
          {
            note: data.note,
            status: data.status,
            id_user_checker_sender: data.id_user_checker_sender,
            updated_by: data.updatedBy,
          },
          {
            where: {
              id: data.id,
            },
          }
        );

        // update pallet departure
        const DeparturePallet = models.PalletTransfers;

        const updateQtyDeparture = DeparturePallet
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function updatePalletQtySending({ data }) {
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

        // update data sending

        // update data departure company
        for (const mstPallet of mstPallets) {
          const quantityPallet = await new Promise((resolve) => {
            const sql = `SELECT b.name as kondisi_pallet , a.quantity
            FROM "mst_pallet_mst_companies" as a
            JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
            WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
            const params = [data.id_company_departure, mstPallet.id];
            pool.query(sql, params, (err, res) => {
              if (err) resolve(err);
              resolve(res);
            });
          });

          var dataPalletCompanyDeparture = {
            'mst_pallet_id': mstPallet.id,
            'mst_companies_id': data.id_company_departure,
            'quantity': quantityPallet.rows[0].quantity,
            'quantityNew': 0
          }
          if (mstPallet.name == 'Good Pallet') {
            dataPalletCompanyDeparture.quantityNew = parseInt(dataPalletCompanyDeparture.quantity) - parseInt(data.good_pallet)
          }
          if (mstPallet.name == 'TBR Pallet') {
            dataPalletCompanyDeparture.quantityNew = parseInt(dataPalletCompanyDeparture.quantity) - parseInt(data.tbr_pallet)
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletCompanyDeparture.quantityNew = parseInt(dataPalletCompanyDeparture.quantity) - parseInt(data.ber_pallet)
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletCompanyDeparture.quantityNew = parseInt(dataPalletCompanyDeparture.quantity) - parseInt(data.missing_pallet)
          }
          
          console.log(dataPalletCompanyDeparture);
          // console.log(data.good_pallet);
          const DepartureCompanyPallet = models.CompaniesPallet;
          const updateDeparturePalletQty = await DepartureCompanyPallet.update(
            {
              quantity: dataPalletCompanyDeparture.quantityNew,
            },
            {
              where: {
                mst_companies_id: dataPalletCompanyDeparture.mst_companies_id,
                mst_pallet_id: dataPalletCompanyDeparture.mst_pallet_id,
              },
            }
          );
        }

        // update data transporter company
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

          var dataPalletCompanyTransporter = {
            'mst_pallet_id': mstPallet.id,
            'mst_companies_id': data.id_company_transporter,
            'quantity': quantityPallet.rows[0].quantity,
            'quantityNew': 0
          }
          if (mstPallet.name == 'Good Pallet') {
            dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) + parseInt(data.good_pallet)
          }
          if (mstPallet.name == 'TBR Pallet') {
            dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) + parseInt(data.tbr_pallet)
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) + parseInt(data.ber_pallet)
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) + parseInt(data.missing_pallet)
          }
          
          const TransporterCompanyPallet = models.CompaniesPallet;
          const updateTransporterPalletQty = await TransporterCompanyPallet.update(
            {
              quantity: dataPalletCompanyTransporter.quantityNew,
            },
            {
              where: {
                mst_companies_id: dataPalletCompanyTransporter.mst_companies_id,
                mst_pallet_id: dataPalletCompanyTransporter.mst_pallet_id,
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

    async function receiving({ data }) {
      try {
        // use sequelize on inserting
        const PalletTransfer = models.PalletTransfers;
        const res = await PalletTransfer.update(
          {
            note: data.note,
            status: data.status,
            id_user_checker_receiver: data.id_user_checker_receiver,
            updated_by: data.updatedBy,
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

    async function updatePalletQtyReceiving({ data }) {
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

        // update data sending

        // update data departure company
        for (const mstPallet of mstPallets) {
          const quantityPallet = await new Promise((resolve) => {
            const sql = `SELECT b.name as kondisi_pallet , a.quantity
            FROM "mst_pallet_mst_companies" as a
            JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
            WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
            const params = [data.id_company_destination, mstPallet.id];
            pool.query(sql, params, (err, res) => {
              if (err) resolve(err);
              resolve(res);
            });
          });

          var dataPalletCompanyDestination = {
            'mst_pallet_id': mstPallet.id,
            'mst_companies_id': data.id_company_destination,
            'quantity': quantityPallet.rows[0].quantity,
            'quantityNew': 0
          }
          if (mstPallet.name == 'Good Pallet') {
            dataPalletCompanyDestination.quantityNew = parseInt(dataPalletCompanyDestination.quantity) + parseInt(data.good_pallet)
          }
          if (mstPallet.name == 'TBR Pallet') {
            dataPalletCompanyDestination.quantityNew = parseInt(dataPalletCompanyDestination.quantity) + parseInt(data.tbr_pallet)
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletCompanyDestination.quantityNew = parseInt(dataPalletCompanyDestination.quantity) + parseInt(data.ber_pallet)
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletCompanyDestination.quantityNew = parseInt(dataPalletCompanyDestination.quantity) + parseInt(data.missing_pallet)
          }
          
          console.log(dataPalletCompanyDestination);
          // console.log(data.good_pallet);
          const DestinationCompanyPallet = models.CompaniesPallet;
          const updateDestinationPalletQty = await DestinationCompanyPallet.update(
            {
              quantity: dataPalletCompanyDestination.quantityNew,
            },
            {
              where: {
                mst_companies_id: dataPalletCompanyDestination.mst_companies_id,
                mst_pallet_id: dataPalletCompanyDestination.mst_pallet_id,
              },
            }
          );
        }

        // update data transporter company
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

          var dataPalletCompanyTransporter = {
            'mst_pallet_id': mstPallet.id,
            'mst_companies_id': data.id_company_transporter,
            'quantity': quantityPallet.rows[0].quantity,
            'quantityNew': 0
          }
          if (mstPallet.name == 'Good Pallet') {
            dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.good_pallet)
          }
          if (mstPallet.name == 'TBR Pallet') {
            dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.tbr_pallet)
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.ber_pallet)
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.missing_pallet)
          }
          
          const TransporterCompanyPallet = models.CompaniesPallet;
          const updateTransporterPalletQty = await TransporterCompanyPallet.update(
            {
              quantity: dataPalletCompanyTransporter.quantityNew,
            },
            {
              where: {
                mst_companies_id: dataPalletCompanyTransporter.mst_companies_id,
                mst_pallet_id: dataPalletCompanyTransporter.mst_pallet_id,
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

    async function insertNewPalletTransfer({ data }) {
      try {
        // use sequelize on inserting
        const PalletTransfer = models.PalletTransfers;
        const res = await PalletTransfer.create(data);
        const idPalletTransfer = res.id;

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
          var dataPalletinPalletTransfers = {
            'mst_pallet_id': mstPallet.id,
            'trx_pallet_transfer_id': idPalletTransfer,
            'quantity': 0
          }
          if (mstPallet.name == 'Good Pallet') {
            dataPalletinPalletTransfers.quantity = data.good_pallet
          }
          if (mstPallet.name == 'TBR Pallet') {
            dataPalletinPalletTransfers.quantity = data.tbr_pallet
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletinPalletTransfers.quantity = data.ber_pallet
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletinPalletTransfers.quantity = data.missing_pallet
          }
          
          const palletTransferPallet = models.PalletTransferPallet;
          const res = await palletTransferPallet.create(dataPalletinPalletTransfers);
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
        if (month != '10' || month != '11' || month != '12') {
          formatedMonth = '0' + month
        } else {
          formatedMonth = month
        }

        // query trx number
        const res = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
          const params = ['TP', formatedMonth, year];
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
            trx_type: 'TP',
            code: '2',
            month: formatedMonth,
            year: year,
            increment_number: 0
          });

          // query trx number
          const res = await new Promise((resolve) => {
            const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
            const params = ['TP', formatedMonth, year];
            pool.query(sql, params, (err, res) => {
              pool.end(); // end connection
    
              if (err) resolve(err);
              resolve(res);
            });
          });
          console.log(res);
          return res;
        }
        
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function checkTruck({ data }) {
      try {
        const pool = await connects();
  
        const { id_truck, id_new_truck, change_type } = data; // deconstruct
        var truckId;
        const res = await new Promise((resolve) => {
          const sql = `SELECT id FROM "trx_pallet_transfer" WHERE "id_truck" = $1 AND "trx_status" != $2 AND "is_deleted" = $3;`;
          if(change_type === 'change_truck') {
            truckId = id_new_truck;
          } else {
            truckId = id_truck;
          }
          const params = [truckId, 4, 0];
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
          const sql = `SELECT a.*, b.name as departure_company,
          c.name as destination_company,  d.name as transporter_company,
          e.license_plate, f.name as driver_name, g.username as sender_name
          FROM "trx_pallet_transfer" as a
          JOIN "mst_companies" as b ON a."id_company_departure" = b.id
          JOIN "mst_companies" as c ON a."id_company_destination" = c.id
          JOIN "mst_companies" as d ON a."id_company_transporter" = d.id
          JOIN "mst_truck" as e ON a."id_truck" = e.id
          JOIN "mst_driver" as f ON a."id_driver" = f.id
          LEFT JOIN "users" as g ON a."id_user_checker_sender" = g.id
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
          const sql = `SELECT a.*, b.name as departure_company,
          c.name as destination_company,  d.name as transporter_company,
          e.license_plate, f.name as driver_name, g.username as sender_name
          FROM "trx_pallet_transfer" as a
          JOIN "mst_companies" as b ON a."id_company_departure" = b.id
          JOIN "mst_companies" as c ON a."id_company_destination" = c.id
          JOIN "mst_companies" as d ON a."id_company_transporter" = d.id
          JOIN "mst_truck" as e ON a."id_truck" = e.id
          JOIN "mst_driver" as f ON a."id_driver" = f.id
          LEFT JOIN "users" as g ON a."id_user_checker_sender" = g.id
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
  };
  
  module.exports = query;
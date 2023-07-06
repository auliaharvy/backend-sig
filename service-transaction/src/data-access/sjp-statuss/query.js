const query = ({ connects, models }) => {
    return Object.freeze({
      insertNewSjpStatus,
      checkTrxNumberExist,
      checkTruck,
      getTrxNumber,
      selectAll,
      exportAll,
      selectOne,
      checkNameExistUpdate,
      deleteSjpStatus,
      approval,
      updatePalletQtySending,
      receiving,
      updatePalletQtyReceiving,
      getPalletQuantity,
      checkDepartureQty,
      updateStatusSjp,
      checkTransporterQty,
      
    });

    async function updateStatusSjp({ data }) {
      try {
        var trxStatus = 0;
        if (data.sjp_status == 'send') {
          trxStatus = 1;
        } if (data.sjp_status == 'receive') {
          trxStatus = 2;
        } if (data.sjp_status == 'sendback') {
          trxStatus = 3;
        } if (data.sjp_status == 'receive_sendback') {
          trxStatus = 4;
        }

        // use sequelize on inserting
        const Sjp = models.Sjps;
        const res = await Sjp.update(
          {
            trx_status: trxStatus,
          },
          {
            where: {
              id: data.id_sjp,
            },
          }
        );
        return res;
      } catch (e) {
        //("Error: ", e);
      }
    }

    async function checkDepartureQty({ data }) {
      try {
        var id_company = 0;
        if(data.is_sendback == 0) {
          id_company = data.id_departure_company;
        } if(data.is_sendback == 1) {
          id_company = data.id_destination_company;
        }
        const pool = await connects();
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT b.name as kondisi_pallet , a.quantity
          FROM "mst_pallet_mst_companies" as a
          JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
          WHERE a.mst_companies_id = $1;`;
          const params = [id_company];
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

    async function checkTransporterQty({ data }) {
      try {
        const pool = await connects();
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT b.name as kondisi_pallet , a.quantity
          FROM "mst_pallet_mst_companies" as a
          JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
          WHERE a.mst_companies_id = $1;`;
          const params = [data.id_transporter_company];
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
          FROM "trx_sjp_status_mst_pallet" as a
          JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
          WHERE a.trx_sjp_status_id = $1;`;
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
  
    async function deleteSjpStatus({ id }) {
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
        //("Error: ", e);
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
        //("Error: ", e);
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

        var id_company = 0;
        if (data.is_sendback == 0) {
          id_company = data.id_departure_company
        } if (data.is_sendback == 1) {
          id_company = data.id_destination_company
        }
        // update data sending

        // update data departure company
        for (const mstPallet of mstPallets) {
          const quantityPallet = await new Promise((resolve) => {
            const sql = `SELECT b.name as kondisi_pallet , a.quantity
            FROM "mst_pallet_mst_companies" as a
            JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
            WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
            const params = [id_company, mstPallet.id];
            pool.query(sql, params, (err, res) => {
              if (err) resolve(err);
              resolve(res);
            });
          });

          var dataPalletCompany = {
            'mst_pallet_id': mstPallet.id,
            'mst_companies_id': id_company,
            'quantity': quantityPallet.rows[0].quantity,
            'quantityNew': 0
          }
          if (mstPallet.name == 'Good Pallet') {
            dataPalletCompany.quantityNew = parseInt(dataPalletCompany.quantity) - parseInt(data.good_pallet)
          }
          if (mstPallet.name == 'TBR Pallet') {
            dataPalletCompany.quantityNew = parseInt(dataPalletCompany.quantity) - parseInt(data.tbr_pallet)
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletCompany.quantityNew = parseInt(dataPalletCompany.quantity) - parseInt(data.ber_pallet)
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletCompany.quantityNew = parseInt(dataPalletCompany.quantity) - parseInt(data.missing_pallet)
          }
          
          const DepartureCompanyPallet = models.CompaniesPallet;
          const updateDeparturePalletQty = await DepartureCompanyPallet.update(
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

        // update data transporter company
        for (const mstPallet of mstPallets) {
          const quantityPallet = await new Promise((resolve) => {
            const sql = `SELECT b.name as kondisi_pallet , a.quantity
            FROM "mst_pallet_mst_companies" as a
            JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
            WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
            const params = [data.id_transporter_company, mstPallet.id];
            pool.query(sql, params, (err, res) => {
              if (err) resolve(err);
              resolve(res);
            });
          });

          var dataPalletCompanyTransporter = {
            'mst_pallet_id': mstPallet.id,
            'mst_companies_id': data.id_transporter_company,
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
        //("Error: ", e);
      }
    }

    async function receiving({ data }) {
      try {
        // use sequelize on inserting
        const SjpStatus = models.SjpStatuss;
        const res = await SjpStatus.update(
          {
            note: data.note,
            status: data.status,
            id_user_receiver: data.id_user_receiver,
            receiving_driver_approval: data.receiving_driver_approval,
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

        // update data receiving

        var id_company = 0;
        if (data.is_sendback == 0) {
          id_company = data.id_destination_company
        } if (data.is_sendback == 1) {
          id_company = data.id_departure_company
        }

        // update data company
        for (const mstPallet of mstPallets) {
          const quantityPallet = await new Promise((resolve) => {
            const sql = `SELECT b.name as kondisi_pallet , a.quantity
            FROM "mst_pallet_mst_companies" as a
            JOIN "mst_pallet" as b ON a."mst_pallet_id" = b.id
            WHERE a.mst_companies_id = $1 AND a.mst_pallet_id = $2;`;
            const params = [id_company, mstPallet.id];
            pool.query(sql, params, (err, res) => {
              if (err) resolve(err);
              resolve(res);
            });
          });

          var dataPalletCompanyDestination = {
            'mst_pallet_id': mstPallet.id,
            'mst_companies_id': id_company,
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
          
          // //(data.good_pallet);
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
            const params = [data.id_transporter_company, mstPallet.id];
            pool.query(sql, params, (err, res) => {
              if (err) resolve(err);
              resolve(res);
            });
          });

          var dataPalletCompanyTransporter = {
            'mst_pallet_id': mstPallet.id,
            'mst_companies_id': data.id_transporter_company,
            'quantity': quantityPallet.rows[0].quantity,
            'quantityNew': 0
          }

          if (data.is_sendback == 0) {
            if (mstPallet.name == 'Good Pallet') {
              dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.totalSendPallet)
            }
          }

          if (data.is_sendback == 1) {
            var goodTbrPallet =  parseInt(data.good_pallet) - parseInt(data.tbr_pallet);
            var missingBerPallet = parseInt(data.ber_pallet) + parseInt(data.missing_pallet)
            // if(data.tbr_pallet > (parseInt(data.totalSendPallet) - parseInt(data.good_pallet)) ||  missingBerPallet > (parseInt(data.totalSendPallet) - goodTbrPallet))

            // cek apakah awalnya tidak ada kirim pallet TBR
            if(data.send_tbr_pallet == 0) {
              if(missingBerPallet > 0) {
                if (mstPallet.name == 'Good Pallet') {
                  dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - (missingBerPallet + parseInt(data.good_pallet))
                }
                if (mstPallet.name == 'BER Pallet') {
                  dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.ber_pallet)
                }
                if (mstPallet.name == 'Missing Pallet') {
                  dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.missing_pallet)
                }
              } else {
                if (mstPallet.name == 'Good Pallet') {
                  dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.send_good_pallet)
                }
              } 
            } else if (data.tbr_pallet > data.send_tbr_pallet) { //jika penerimaan tbr pallet lebih besar dari yang di kirim
              if(missingBerPallet > 0) {
                var selisihTbrPallet = data.tbr_pallet - data.send_tbr_pallet;
                var selisihGoodPallet = data.send_good_pallet - data.good_pallet;
                if(selisihGoodPallet == selisihTbrPallet) {
                  if (mstPallet.name == 'Good Pallet') {
                    dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - (selisihGoodPallet + missingBerPallet)
                  }
                  if (mstPallet.name == 'TBR Pallet') {
                    dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - (selisihTbrPallet + missingBerPallet)
                  }
                  if (mstPallet.name == 'BER Pallet') {
                    dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) + parseInt(data.ber_pallet)
                  }
                  if (mstPallet.name == 'Missing Pallet') {
                    dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) + parseInt(data.missing_pallet)
                  }
                }
              } else {
                var selisihTbrPallet = data.tbr_pallet - data.send_tbr_pallet;
                var selisihGoodPallet = data.send_good_pallet - data.good_pallet;
                if(selisihGoodPallet == selisihTbrPallet) {
                  if (mstPallet.name == 'Good Pallet') {
                    dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.send_good_pallet)
                  }
                  if (mstPallet.name == 'TBR Pallet') {
                    dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.send_tbr_pallet)
                  }
                }
              }
            } else if(data.good_pallet == data.send_good_pallet && data.tbr_pallet == data.send_tbr_pallet) {
              if (mstPallet.name == 'Good Pallet') {
                dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.send_good_pallet)
              }
              if (mstPallet.name == 'TBR Pallet') {
                dataPalletCompanyTransporter.quantityNew = parseInt(dataPalletCompanyTransporter.quantity) - parseInt(data.send_tbr_pallet)
              }
            } else {
              if (mstPallet.name == 'Good Pallet') {
                dataPalletCompanyDestination.quantityNew = parseInt(dataPalletCompanyDestination.quantity) - parseInt(data.good_pallet)
              }
              if (mstPallet.name == 'TBR Pallet') {
                dataPalletCompanyDestination.quantityNew = parseInt(dataPalletCompanyDestination.quantity) - parseInt(data.tbr_pallet)
              }
              if (mstPallet.name == 'BER Pallet') {
                dataPalletCompanyDestination.quantityNew = parseInt(dataPalletCompanyDestination.quantity) - parseInt(data.ber_pallet)
              }
              if (mstPallet.name == 'Missing Pallet') {
                dataPalletCompanyDestination.quantityNew = parseInt(dataPalletCompanyDestination.quantity) - parseInt(data.missing_pallet)
              }
            }
            
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
        //("Error: ", e);
      }
    }

    async function insertNewSjpStatus({ data }) {
      try {
        // use sequelize on inserting
        const SjpStatus = models.SjpStatuss;
        const res = await SjpStatus.create(data);
        const idSjpStatus = res.id;
        //(res.id);

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
          var dataPalletinSjpStatus = {
            'mst_pallet_id': mstPallet.id,
            'trx_sjp_status_id': idSjpStatus,
            'quantity': 0
          }
          if (mstPallet.name == 'Good Pallet') {
            dataPalletinSjpStatus.quantity = data.good_pallet
          }
          if (mstPallet.name == 'TBR Pallet') {
            dataPalletinSjpStatus.quantity = data.tbr_pallet
          }
          if (mstPallet.name == 'BER Pallet') {
            dataPalletinSjpStatus.quantity = data.ber_pallet
          }
          if (mstPallet.name == 'Missing Pallet') {
            dataPalletinSjpStatus.quantity = data.missing_pallet
          }
          
          const palletSjpStatus = models.SjpStatusPallet;
          const res = await palletSjpStatus.create(dataPalletinSjpStatus);
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
        if (month != '10' || month != '11' || month != '12') {
          formatedMonth = '0' + month
        } else {
          formatedMonth = month
        }

        // query trx number
        const res = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
          const params = ['SJPS', formatedMonth, year];
          pool.query(sql, params, (err, res) => {
  
            if (err) resolve(err);
            resolve(res);
          });
        });
        
        if (res.rowCount > 0) {
          return res;
        } else {
          // create txr number if not exist
          const TrxNumber = models.TrxNumbers;
          const resAdd = await TrxNumber.create({
            trx_type: 'SJPS',
            code: '3',
            month: formatedMonth,
            year: year,
            increment_number: 0
          });

          // query trx number
          const res = await new Promise((resolve) => {
            const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
            const params = ['SJPS', formatedMonth, year];
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
          const sql = `SELECT a.*,b.trx_number as sjp_number, b.id_departure_company, b.id_destination_company, b.id_transporter_company, b.pallet_quantity, b.trx_status as status_sjp,
          c.name as departure_company,
          d.name as destination_company, e.name as transporter_company, f.username as sender_name,
          g.username as receiver_name
          FROM "trx_sjp_status" as a
          JOIN "trx_sjp" as b ON a."id_sjp" = b.id
          JOIN "mst_companies" as c ON b."id_departure_company" = c.id
          JOIN "mst_companies" as d ON b."id_destination_company" = d.id
          JOIN "mst_companies" as e ON b."id_transporter_company" = e.id
          LEFT JOIN "users" as f ON a."id_user_sender" = f.id
          LEFT JOIN "users" as g ON a."id_user_receiver" = g.id
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
          const sql = `SELECT a.*,b.trx_number as sjp_number, b.id_departure_company, b.id_destination_company, b.id_transporter_company, b.pallet_quantity, b.trx_status as status_sjp,
          c.name as departure_company,
          d.name as destination_company, e.name as transporter_company, f.username as sender_name,
          g.username as receiver_name
          FROM "trx_sjp_status" as a
          JOIN "trx_sjp" as b ON a."id_sjp" = b.id
          JOIN "mst_companies" as c ON b."id_departure_company" = c.id
          JOIN "mst_companies" as d ON b."id_destination_company" = d.id
          JOIN "mst_companies" as e ON b."id_transporter_company" = e.id
          LEFT JOIN "users" as f ON a."id_user_sender" = f.id
          LEFT JOIN "users" as g ON a."id_user_receiver" = g.id
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
          const sql = `SELECT a.*,b.trx_number as sjp_number, b.id_departure_company, b.id_destination_company, b.id_transporter_company, b.pallet_quantity,
          b.id_truck, b.id_driver,
          c.name as departure_company,
          d.name as destination_company, e.name as transporter_company, f.username as sender_name,
          g.username as receiver_name
          FROM "trx_sjp_status" as a
          JOIN "trx_sjp" as b ON a."id_sjp" = b.id
          JOIN "mst_companies" as c ON b."id_departure_company" = c.id
          JOIN "mst_companies" as d ON b."id_destination_company" = d.id
          JOIN "mst_companies" as e ON b."id_transporter_company" = e.id
          LEFT JOIN "users" as f ON a."id_user_sender" = f.id
          LEFT JOIN "users" as g ON a."id_user_receiver" = g.id
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
        //("Error: ", e);
      }
    }
  };
  
  module.exports = query;
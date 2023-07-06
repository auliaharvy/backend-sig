const addSjpStatus = ({ makeSjpStatuss, sjpStatusDb, allTransactionDb,sjpDb,trxNumbersDb, SENDMAIL, SJP_TEMPLATE }) => {
    return async function post(info) {
      let data = await makeSjpStatuss(info); // entity
  
      data = {
        id_sjp: data.getSjp(),
        id_user_sender: data.getSender(),
        id_departure_company: data.getDeparture(),
        id_destination_company: data.getDestination(),
        id_transporter_company: data.getTransporter(),
        sending_driver_approval: data.getDriverApproval(),
        receiving_driver_approval: data.getReceivingDriverApproval(),
        status: data.getStatus(),
        is_sendback: data.getIsSendback(),
        note: data.getNote(),
        good_pallet: data.getGoodPallet(),
        tbr_pallet: data.getTbrPallet(),
        ber_pallet: data.getBerPallet(),
        missing_pallet: data.getMissingPallet(),
        created_by: data.getCreatedBy(),
        updated_by: data.getUpdatedBy(),
        sjp_status: data.getSjpStatus(),
      };

      // check Departure Quantity
      if(data.is_sendback == 0) {
        const check = await sjpStatusDb.checkDepartureQty({ data });
        if (check.rowCount > 0) {
          for (const mstPallet of check.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < data.good_pallet) {
              throw new Error(`The Quantity of Good Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'TBR Pallet' && mstPallet.quantity < data.tbr_pallet) {
              throw new Error(`The Quantity of TBR Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'BER Pallet' && mstPallet.quantity < data.ber_pallet) {
              throw new Error(`The Quantity of BER Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'Missing Pallet' && mstPallet.quantity < data.missing_pallet) {
              throw new Error(`The Quantity of Missing Pallet exceeds.`);
            }
          }
        } 

        // get TRX NUMBER
        const trxNumber = await sjpStatusDb.getTrxNumber();
        const dataTrxNumber = trxNumber.rows[0];
        var incrNumber = parseInt(dataTrxNumber.increment_number) + 1;
        var FormatedIncrNumber = '';
        if (incrNumber < 10) {
          FormatedIncrNumber = '000' + incrNumber;
        } else if (incrNumber < 100) {
          FormatedIncrNumber = '00' + incrNumber;
        } else if (incrNumber < 1000) {
          FormatedIncrNumber = '0' + incrNumber;
        } else {
          FormatedIncrNumber = incrNumber;
        }
        data.trx_number = dataTrxNumber.trx_type + '-' + dataTrxNumber.year + dataTrxNumber.month + '-' + FormatedIncrNumber;

        //   insert SJP Status
        const res = await sjpStatusDb.insertNewSjpStatus({ data });

        // update pallet quantity
        const resUpdateQty = await sjpStatusDb.updatePalletQtySending({ data });
        // update trx_status SJP
        const trx_statusSjp = await sjpStatusDb.updateStatusSjp({ data });
        
        // update trxNumber
        const dataUpdateTrxNumber = {
          id: dataTrxNumber.id,
          increment_number: incrNumber ++,
        };
        const trxNumberUpdate = await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });

      // all Transaction Record
      // get LOG NUMBER
      const logNumber = await allTransactionDb.getLogNumber();
      const dataLogNumber = logNumber.rows[0];
      var incrLogNumber = parseInt(dataLogNumber.increment_number) + 1;
      var FormatedIncrLogNumber = '';
      if (incrLogNumber < 10) {
        FormatedIncrLogNumber = '000' + incrLogNumber;
      } else if (incrLogNumber < 100) {
        FormatedIncrLogNumber = '00' + incrLogNumber;
      } else if (incrLogNumber < 1000) {
        FormatedIncrLogNumber = '0' + incrLogNumber;
      } else {
        FormatedIncrLogNumber = incrLogNumber;
      }
      data.log_number = dataLogNumber.trx_type + '-' + dataLogNumber.year + dataLogNumber.month + '-' + FormatedIncrLogNumber;
      // update logNumber
      const dataUpdateLogNumber = {
        id: dataLogNumber.id,
        increment_number: incrLogNumber ++,
      };
      // //(dataUpdateLogNumber)
      // //(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = res.dataValues.id;
      const trans = await sjpStatusDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        const resPalletQuantity = await sjpStatusDb.getPalletQuantity(dataTrans.id);

      var qtyGoodPallet = 0;
      var qtyTbrPallet = 0;
      var qtyBerPallet = 0;
      var qtyMissingPallet = 0;
      for (const qtyPallet of resPalletQuantity.rows) {
        if (qtyPallet.kondisi_pallet == "Good Pallet") {
          qtyGoodPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "TBR Pallet") {
          qtyTbrPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "BER Pallet") {
          qtyBerPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "Missing Pallet") {
          qtyMissingPallet = parseInt(qtyPallet.quantity);
        }
      }
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_sjp = dataTrans.id_sjp;
        dataAllTransaction.id_sjp_status = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'SJP STATUS';
        dataAllTransaction.status = 'SEND';
        dataAllTransaction.sender_reporter = dataTrans.sender_name;
        dataAllTransaction.receiver_approver = dataTrans.receiver_name;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.good_pallet = qtyGoodPallet;
        dataAllTransaction.tbr_pallet = qtyTbrPallet;
        dataAllTransaction.ber_pallet = qtyBerPallet;
        dataAllTransaction.missing_pallet = qtyMissingPallet;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });


        // SEND MAIL
        // get data SJP
        const idSjp = data.id_sjp;
        const sjp = await sjpDb.selectOne({ id: idSjp });
        if (sjp.rowCount > 0) {
          const dataSjp = sjp.rows[0];
          data.departure = dataSjp.departure_company;
          data.email_departure = dataSjp.email_departure;
          data.destination = dataSjp.destination_company;
          data.email_destination = dataSjp.email_destination;
          data.truck_number = dataSjp.license_plate;
          data.driver = dataSjp.driver_name;
        }


        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: data.email_destination, // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: SJP_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          //("Email sent successfully");
          //("MESSAGE ID: ", info.messageId);
        });

        let msg = `Error on inserting SJP Status, please try again.`;
        if (res) {
          msg = `SJP Status has been added successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      } else {
        const check = await sjpStatusDb.checkDepartureQty({ data });
        if (check.rowCount > 0) {
          for (const mstPallet of check.rows) {
            if (mstPallet.kondisi_pallet == 'Good Pallet' && mstPallet.quantity < data.good_pallet) {
              throw new Error(`The Quantity of Good Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'TBR Pallet' && mstPallet.quantity < data.tbr_pallet) {
              throw new Error(`The Quantity of TBR Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'BER Pallet' && mstPallet.quantity < data.ber_pallet) {
              throw new Error(`The Quantity of BER Pallet exceeds.`);
            }
            if (mstPallet.kondisi_pallet == 'Missing Pallet' && mstPallet.quantity < data.missing_pallet) {
              throw new Error(`The Quantity of Missing Pallet exceeds.`);
            }
          }
          
        } 

        // get TRX NUMBER
        const trxNumber = await sjpStatusDb.getTrxNumber();
        const dataTrxNumber = trxNumber.rows[0];
        var incrNumber = parseInt(dataTrxNumber.increment_number) + 1;
        var FormatedIncrNumber = '';
        if (incrNumber < 10) {
          FormatedIncrNumber = '000' + incrNumber;
        } else if (incrNumber < 100) {
          FormatedIncrNumber = '00' + incrNumber;
        } else if (incrNumber < 1000) {
          FormatedIncrNumber = '0' + incrNumber;
        } else {
          FormatedIncrNumber = incrNumber;
        }
        data.trx_number = dataTrxNumber.trx_type + '-' + dataTrxNumber.year + dataTrxNumber.month + '-' + FormatedIncrNumber;

        //   insert SJP Status
        const res = await sjpStatusDb.insertNewSjpStatus({ data });

        // update pallet quantity
        const resUpdateQty = await sjpStatusDb.updatePalletQtySending({ data });
        // update trx_status SJP
        const trx_statusSjp = await sjpStatusDb.updateStatusSjp({ data });
        
        // update trxNumber
        const dataUpdateTrxNumber = {
          id: dataTrxNumber.id,
          increment_number: incrNumber ++,
        };
        const trxNumberUpdate = await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });

      // all Transaction Record
      // get LOG NUMBER
      const logNumber = await allTransactionDb.getLogNumber();
      const dataLogNumber = logNumber.rows[0];
      var incrLogNumber = parseInt(dataLogNumber.increment_number) + 1;
      var FormatedIncrLogNumber = '';
      if (incrLogNumber < 10) {
        FormatedIncrLogNumber = '000' + incrLogNumber;
      } else if (incrLogNumber < 100) {
        FormatedIncrLogNumber = '00' + incrLogNumber;
      } else if (incrLogNumber < 1000) {
        FormatedIncrLogNumber = '0' + incrLogNumber;
      } else {
        FormatedIncrLogNumber = incrLogNumber;
      }
      data.log_number = dataLogNumber.trx_type + '-' + dataLogNumber.year + dataLogNumber.month + '-' + FormatedIncrLogNumber;
      // update logNumber
      const dataUpdateLogNumber = {
        id: dataLogNumber.id,
        increment_number: incrLogNumber ++,
      };
      // //(dataUpdateLogNumber)
      // //(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = res.dataValues.id;
      const trans = await sjpStatusDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        const resPalletQuantity = await sjpStatusDb.getPalletQuantity(dataTrans.id);

      var qtyGoodPallet = 0;
      var qtyTbrPallet = 0;
      var qtyBerPallet = 0;
      var qtyMissingPallet = 0;
      for (const qtyPallet of resPalletQuantity.rows) {
        if (qtyPallet.kondisi_pallet == "Good Pallet") {
          qtyGoodPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "TBR Pallet") {
          qtyTbrPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "BER Pallet") {
          qtyBerPallet = parseInt(qtyPallet.quantity);
        }
        if (qtyPallet.kondisi_pallet == "Missing Pallet") {
          qtyMissingPallet = parseInt(qtyPallet.quantity);
        }
      }
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_sjp = dataTrans.id_sjp;
        dataAllTransaction.id_sjp_status = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'SJP STATUS';
        dataAllTransaction.status = 'SEND BACK';
        dataAllTransaction.sender_reporter = dataTrans.sender_name;
        dataAllTransaction.receiver_approver = dataTrans.receiver_name;
        dataAllTransaction.note = dataTrans.note;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.good_pallet = qtyGoodPallet;
        dataAllTransaction.tbr_pallet = qtyTbrPallet;
        dataAllTransaction.ber_pallet = qtyBerPallet;
        dataAllTransaction.missing_pallet = qtyMissingPallet;
        dataAllTransaction.created_by = data.created_by;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

        // SEND MAIL
        // get data SJP
        const idSjp = data.id_sjp;
        const sjp = await sjpDb.selectOne({ id: idSjp });
        //(sjp);
        if (sjp.rowCount > 0) {
          const dataSjp = sjp.rows[0];
          data.departure = dataSjp.destination_company;
          data.email_departure = dataSjp.email_destination;
          data.destination = dataSjp.departure_company;
          data.email_destination = dataSjp.email_departure;
          data.transporter = dataSjp.transporter_company;
          data.truck_number = dataSjp.license_plate;
          data.driver = dataSjp.driver_name;
        }

        var email = data.email_destination ? data.email_destination : 'pms.sig.dev@gmail.com'
        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: email, // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: SJP_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          //("Email sent successfully");
          //("MESSAGE ID: ", info.messageId);
        });
        let msg = `Error on inserting SJP Status, please try again.`;
        if (res) {
          msg = `SJP Status has been added successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }
      

      // ##
      
  
      
    };
  };
  
  module.exports = addSjpStatus;
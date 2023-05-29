const addSjpStatus = ({ makeSjpStatuss, sjpStatusDb, trxNumbersDb }) => {
    return async function post(info) {
      let data = await makeSjpStatuss(info); // entity
  
      data = {
        id_sjp: data.getSjp(),
        id_user_sender: data.getSender(),
        id_departure_company: data.getDeparture(),
        id_destination_company: data.getDestination(),
        id_transporter_company: data.getTransporter(),
        sending_driver_approval: data.getDriverApproval(),
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
          console.log(check)
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
          console.log(check)
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
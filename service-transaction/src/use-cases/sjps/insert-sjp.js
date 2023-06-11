const addSjp = ({ makeSjps, sjpDb, allTransactionDb, trxNumbersDb }) => {
    return async function post(info) {
      let data = await makeSjps(info); // entity
  
      data = {
        id_departure_company: data.getDeparture(),
        id_destination_company: data.getDestination(),
        id_transporter_company: data.getTransporter(),
        id_truck: data.getTruck(),
        id_driver: data.getDriver(),
        no_do: data.getNoDo(),
        is_multiple: data.getIsMultiple(),
        tonnage: data.getTonnage(),
        packaging: data.getPackaging(),
        product_quantity: data.getProductQuantity(),
        eta: data.getEta(),
        departure_time: data.getDepartureTime(),
        pallet_quantity: data.getPalletQuantity(),
        createdBy: data.getCreatedBy(),
        updatedBy: data.getUpdatedBy(),
      };
  
      // check truck on board 
      const check = await sjpDb.checkTruck({ data });
      if (check.rowCount > 0)
        throw new Error(`This Truck not yet close SJP, please check or change truck.`);

      // get TRX NUMBER
      const trxNumber = await sjpDb.getTrxNumber();
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
    
      //   insert SJP
      const res = await sjpDb.insertNewSjp({ data });
      
      // update trxNumber
      const dataUpdateTrxNumber = {
        id: dataTrxNumber.id,
        increment_number: incrNumber ++,
      };
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });

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
      // console.log(dataUpdateLogNumber)
      // console.log(data.log_number)
      await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber:  dataUpdateLogNumber });

      const idTrans = res.dataValues.id;
      const trans = await sjpDb.selectOne({ id: idTrans });
      const dataAllTransaction = {}
      if (trans.rowCount > 0) {
        const dataTrans = trans.rows[0];
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_sjp = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        dataAllTransaction.transaction = 'SJP';
        dataAllTransaction.no_do = dataTrans.no_do;
        dataAllTransaction.status = 'DRAFT';
        dataAllTransaction.sender_reporter = dataTrans.reporter_name;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.truck_number = dataTrans.license_plate;
        dataAllTransaction.driver_name = dataTrans.driver_name;
        dataAllTransaction.good_pallet = dataTrans.pallet_quantity;
        dataAllTransaction.created_by = data.createdBy;
      }
      
      await allTransactionDb.recordAllTransaction({ data: dataAllTransaction });

      // ##
      let msg = `Error on inserting SJP, please try again.`;
      if (res) {
        msg = `SJP has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addSjp;
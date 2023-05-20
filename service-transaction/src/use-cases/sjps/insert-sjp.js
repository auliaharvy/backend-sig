const addSjp = ({ makeSjps, sjpDb, trxNumbersDb }) => {
    return async function post(info) {
      let data = await makeSjps(info); // entity
  
      data = {
        id_departure_company: data.getDeparture(),
        id_destination_company: data.getDestination(),
        id_transporter_company: data.getTransporter(),
        id_truck: data.getTruck(),
        id_driver: data.getDriver(),
        no_do: data.getNoDo(),
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
      const trxNumberUpdate = await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });
      console.log(trxNumberUpdate);

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
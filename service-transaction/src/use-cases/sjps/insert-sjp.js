const trucksDb = require("../../data-access/trucks/app");

const addSjp = ({ makeSjps, sjpDb, allTransactionDb, companiesDB, trxNumbersDb, trucksDb, driversDb }) => {
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
        truck_number: data.getTruckNumber(),
        driver_name: data.getDriverName(),
        destination_code: data.getDestinationCode(),
        destination: data.getDestinationName(),
        departure_code: data.getDepartureCode(),
        transporter_code: data.getTransporterCode(),
        transporter: data.getTransporterName(),
      };
  
      // check company destination
      const checkCompanyDestination = await companiesDB.checkCompanyExist({ data: {code: data.destination_code} });
      if (checkCompanyDestination.rowCount == 0) {
        dataCreateCompany = {
          id_organization: 1,
          id_company_type: 3,
          name: data.destination,
          code: data.destination_code,
          address: 'AUTO CREATE FROM SJP',
          city: 'AUTO CREATE FROM SJP',
          phone: 'AUTO CREATE FROM SJP',
          email: 'AUTO CREATE FROM SJP',
          tag: 'POOL PALLET',
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
        };
        const newDestination = await companiesDB.insertCompany({ data: dataCreateCompany });
        data.id_destination_company = newDestination.dataValues.id
      } if (checkCompanyDestination.rowCount > 0) { 
        data.id_destination_company = checkCompanyDestination.rows[0].id
      }
        

      // check company transporter
      // const checkCompanyTransporter = await companiesDB.checkCompanyExistName({ data: {name: data.transporter} });
      // if (checkCompanyTransporter.rowCount == 0) {
      //   dataCreateCompany = {
      //     id_organization: 13,
      //     id_company_type: 4,
      //     name: data.transporter,
      //     code: data.transporter_code,
      //     address: 'AUTO CREATE FROM SJP',
      //     city: 'AUTO CREATE FROM SJP',
      //     phone: 'AUTO CREATE FROM SJP',
      //     email: 'AUTO CREATE FROM SJP',
      //     tag: 'TRANSPORTER',
      //     createdBy: data.createdBy,
      //     updatedBy: data.updatedBy,
      //   };
      //   const newTransporter = await companiesDB.insertCompany({ data: dataCreateCompany });
      //   data.id_transporter_company = newTransporter.dataValues.id
      // } if (checkCompanyTransporter.rowCount > 0) { 
      //   data.id_transporter_company = checkCompanyTransporter.rows[0].id
      // }

      // check truck
      const checkTruck = await trucksDb.checkTruckExist({ data: {license_plate: data.truck_number} });
      if (checkTruck.rowCount == 0) {
        dataCreateTruck = {
          id_company: 70,
          transporter_code: data.transporter_code,
          transporter_name: data.transporter,
          license_plate: data.truck_number,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy
        };
        const newTruck = await trucksDb.insertTruck({ data: dataCreateTruck });
        data.id_truck = newTruck.dataValues.id
      } if (checkTruck.rowCount > 0) { 
        data.id_truck = checkTruck.rows[0].id
      }

      // check driver
      const checkDriver = await driversDb.checkDriverExist({ data: {name: data.driver_name} });
      if (checkDriver.rowCount == 0) {
        dataCreateDriver = {
          id_company: 70,
          name: data.driver_name,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy
        };
        const newDriver = await driversDb.insertDriver({ data: dataCreateDriver });
        data.id_driver = newDriver.dataValues.id
      } if (checkDriver.rowCount > 0) { 
        data.id_driver = checkDriver.rows[0].id
      }

      if (data.is_multiple == 0) {
        // check truck on board 
        const check = await sjpDb.checkTruck({ data });
        if (check.rowCount > 0)
          throw new Error(`Truk ini belum melakukan proses Close SJP, Mohon di cek atau ganti truk.`);
      }

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
    
      //(data)
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
      // //(dataUpdateLogNumber)
      // //(data.log_number)
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
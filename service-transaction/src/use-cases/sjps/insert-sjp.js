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
        dataDo: data.getDataDo(),
      };
      data.do_no_sjp = data.dataDo.NO_SPJ;
      data.do_no_booking = data.dataDo.NO_BOOKING;
      data.do_no_do = data.dataDo.NO_DO;
      data.do_tgl_spj = data.dataDo.TGL_SPJ;
      data.do_tgl_do = data.dataDo.TGL_DO;
      data.do_tgl_minta = data.dataDo.TGL_MINTA;
      data.do_kwantum = data.dataDo.KWANTUM;
      data.do_kwantumx = data.dataDo.KWANTUMX;
      data.do_no_spps = data.dataDo.NO_SPPS;
      data.do_nama_sopir = data.dataDo.NAMA_SOPIR;
      data.do_kode_da = data.dataDo.KODE_DA;
      data.do_nama_toko = data.dataDo.NAMA_TOKO;
      data.do_alamat_da = data.dataDo.ALAMAT_DA;
      data.do_propinsi = data.dataDo.PROPINSI;
      data.do_nama_prop = data.dataDo.NAMA_PROP;
      data.do_area = data.dataDo.AREA;
      data.do_nama_area = data.dataDo.NAMA_AREA;
      data.do_sold_to = data.dataDo.SOLD_TO;
      data.do_nama_sold_to = data.dataDo.NAMA_SOLD_TO;
      data.do_plant = data.dataDo.PLANT;
      data.do_nama_plant = data.dataDo.NAMA_PLANT;
      data.do_no_expeditur = data.dataDo.NO_EXPEDITUR;
      data.do_nama_expeditur = data.dataDo.NAMA_EXPEDITUR;
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
        console.log('data destination oke');
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
          id_company: 91,
          transporter_code: data.transporter_code,
          transporter_name: data.transporter,
          license_plate: data.truck_number,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy
        };
        const newTruck = await trucksDb.insertTruck({ data: dataCreateTruck });
        data.id_truck = newTruck.dataValues.id
        console.log('data truck oke');
      } if (checkTruck.rowCount > 0) { 
        data.id_truck = checkTruck.rows[0].id
      }

      // check driver
      const checkDriver = await driversDb.checkDriverExist({ data: {name: data.driver_name} });
      if (checkDriver.rowCount == 0) {
        dataCreateDriver = {
          id_company: 91,
          name: data.driver_name,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy
        };
        const newDriver = await driversDb.insertDriver({ data: dataCreateDriver });
        data.id_driver = newDriver.dataValues.id;
        console.log('data driver oke');
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
      console.log(res);
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
      console.log('data transaction oke');
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
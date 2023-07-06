const updateSjp = ({ sjpDb, patchSjps, trxNumbersDb, SENDMAIL,  CHANGE_DESTINATION_TEMPLATE, CHANGE_TRUCK_TEMPLATE }) => {
    return async function put({ id, ...info }) {
      let data = patchSjps(id, info);

      data = {
        id: data.getId(),
        id_departure_company: data.getDeparture(),
        id_destination_company: data.getDestination(),
        id_new_destination_company: data.getNewDestination(),
        id_transporter_company: data.getTransporter(),
        id_truck: data.getTruck(),
        id_new_truck: data.getNewTruck(),
        id_driver: data.getDriver(),
        is_multiple: data.getIsMultiple(),
        second_driver: data.getSecondDriver(),
        no_do: data.getNoDo(),
        tonnage: data.getTonnage(),
        packaging: data.getPackaging(),
        product_quantity: data.getProductQuantity(),
        pallet_quantity: data.getPalletQuantity(),
        distribution: data.getDistribution(),
        trx_status: data.getTrxStatus(),
        updated_by: data.getUpdatedBy(),
        change_type: data.getChangeType(),
      };

      // check transaction type
      if (data.change_type === 'change_destination') {
        // check id if SJP exist
        const checkId = await sjpDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`SJP doesn't exist, please check.`);

        // update
        const res = await sjpDb.changeDestination({ data });

      // all Transaction Record
      // get LOG NUMBER
      const logNumber = await sjpDb.getLogNumber();
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

      //(res)
      const trans = await sjpDb.selectOne({ id: id });
      const dataAllTransaction = {}
      if (checkId.rowCount > 0) {
        const dataTrans = trans.rows[0];
        //(dataTrans);
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_sjp = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        if(dataTrans.trx_status == 0) {
          dataAllTransaction.status = 'DRAFT';
        }
        if(dataTrans.trx_status == 1) {
          dataAllTransaction.status = 'SEND';
        }
        if(dataTrans.trx_status == 2) {
          dataAllTransaction.status = 'RECEIVE';
        }
        if(dataTrans.trx_status == 3) {
          dataAllTransaction.status = 'SENDBACK';
        }
        if(dataTrans.trx_status == 4) {
          dataAllTransaction.status = 'RECEIVE SENDBACK';
        }
        dataAllTransaction.transaction = 'CHANGE DESTINATION';
        dataAllTransaction.no_do = dataTrans.no_do;
        dataAllTransaction.sender_reporter = dataTrans.reporter_name;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = checkId.rows[0].destination_company;
        dataAllTransaction.company_new_destination = dataTrans.destination_company;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.truck_number = dataTrans.license_plate;
        dataAllTransaction.driver_name = dataTrans.driver_name;
        dataAllTransaction.good_pallet = dataTrans.pallet_quantity;
        dataAllTransaction.created_by = data.updated_by;
      }
      
      await sjpDb.recordAllTransaction({ data: dataAllTransaction });

        const originDestination = await sjpDb.getCompanyDetail({ id: data.id_destination_company });

        const newDestination = await sjpDb.getCompanyDetail({ id: data.id_new_destination_company });

        // SEND MAIL
        // get data SJP
        if (checkId.rowCount > 0) {
          const dataSjp = checkId.rows[0];
          data.trx_number = dataSjp.trx_number;
        }
        if (originDestination.rowCount > 0) {
          const dataOrigin = originDestination.rows[0];
          data.destination = dataOrigin.name;
          data.email_destination = dataOrigin.email;
        }
        if (newDestination.rowCount > 0) {
          const dataNew = newDestination.rows[0];
          data.new_destination = dataNew.name;
          data.email_new_destination = dataNew.email;
        }

        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: [data.email_destination, data.email_new_destination], // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: CHANGE_DESTINATION_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          //("Email sent successfully");
          //("MESSAGE ID: ", info.messageId);
        });
    
        let msg = `SJP was not updated, please try again`;
        if (res[0] == 1) {
          msg = `SJP updated successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }

      // check transaction type
      if (data.change_type === 'change_truck') {
        // check id if employee exist
        const checkId = await sjpDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`SJP doesn't exist, please check.`);

          const check = await sjpDb.checkTruck({ data });
          if (check.rowCount > 0)
            throw new Error(`This Truck not yet close SJP, please check or change truck.`);

        // update
        const res = await sjpDb.changeTruck({ data });

        // all Transaction Record
      // get LOG NUMBER
      const logNumber = await sjpDb.getLogNumber();
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

      //(res)
      const trans = await sjpDb.selectOne({ id: id });
      const dataAllTransaction = {}
      if (checkId.rowCount > 0) {
        const dataTrans = trans.rows[0];
        //(dataTrans);
        dataAllTransaction.log_number = data.log_number;
        dataAllTransaction.id_sjp = dataTrans.id;
        dataAllTransaction.trx_number = dataTrans.trx_number;
        if(dataTrans.trx_status == 0) {
          dataAllTransaction.status = 'DRAFT';
        }
        if(dataTrans.trx_status == 1) {
          dataAllTransaction.status = 'SEND';
        }
        if(dataTrans.trx_status == 2) {
          dataAllTransaction.status = 'RECEIVE';
        }
        if(dataTrans.trx_status == 3) {
          dataAllTransaction.status = 'SENDBACK';
        }
        if(dataTrans.trx_status == 4) {
          dataAllTransaction.status = 'RECEIVE SENDBACK';
        }
        dataAllTransaction.transaction = 'CHANGE TRUCK';
        dataAllTransaction.no_do = dataTrans.no_do;
        dataAllTransaction.sender_reporter = dataTrans.reporter_name;
        dataAllTransaction.company_departure = dataTrans.departure_company;
        dataAllTransaction.company_destination = dataTrans.destination_company;
        dataAllTransaction.company_new_truck = dataTrans.license_plate;
        dataAllTransaction.company_transporter = dataTrans.transporter_company;
        dataAllTransaction.truck_number_new = dataTrans.license_plate;
        dataAllTransaction.truck_number = checkId.rows[0].license_plate;
        dataAllTransaction.driver_name = dataTrans.driver_name;
        dataAllTransaction.driver_name_new = dataTrans.second_driver;
        dataAllTransaction.good_pallet = dataTrans.pallet_quantity;
        dataAllTransaction.created_by = data.updated_by;
      }
      
      await sjpDb.recordAllTransaction({ data: dataAllTransaction });

        const destination = await sjpDb.getCompanyDetail({ id: data.id_destination_company });

        const departure = await sjpDb.getCompanyDetail({ id: data.id_new_destination_company });

        const originTruck = await sjpDb.getTruckDetail({ id: data.id_truck });
        const newTruck = await sjpDb.getTruckDetail({ id: data.id_new_truck });

        //(originTruck.rows[0])
        // SEND MAIL
        // get data SJP
        if (checkId.rowCount > 0) {
          const dataSjp = checkId.rows[0];
          data.trx_number = dataSjp.trx_number;
          data.email_destination = dataSjp.email_destination;
          data.email_departure = dataSjp.email_departure;
          data.driver = dataSjp.driver_name;
        }
        if (departure.rowCount > 0) {
          const dataDeparture = departure.rows[0];
          data.departure = dataDeparture.name;
        }
        if (destination.rowCount > 0) {
          const dataDestination = destination.rows[0];
          data.destination = dataDestination.name;
        }
        if (originTruck.rowCount > 0) {
          const dataOriginTruck = originTruck.rows[0];
          data.truck = dataOriginTruck.license_plate;
        }
        if (newTruck.rowCount > 0) {
          const dataNewTruck = newTruck.rows[0];
          data.new_truck = dataNewTruck.license_plate;
        }

        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: [data.email_departure, data.email_destination], // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: CHANGE_TRUCK_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          //("Email sent successfully");
          //("MESSAGE ID: ", info.messageId);
        });
    
        let msg = `SJP was not updated, please try again`;
        if (res[0] == 1) {
          msg = `SJP updated successfully.`;
          return msg;
        } else {
          throw new Error(msg);
        }
      }
      
    };
  };
  
  module.exports = updateSjp;
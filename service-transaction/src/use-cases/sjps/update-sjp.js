const updateSjp = ({ sjpDb, patchSjps, SENDMAIL,  CHANGE_DESTINATION_TEMPLATE, CHANGE_TRUCK_TEMPLATE }) => {
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

        const originDestination = await sjpDb.getCompanyDetail({ id: data.id_destination_company });

        const newDestination = await sjpDb.getCompanyDetail({ id: data.id_new_destination_company });

        // SEND MAIL
        // get data SJP
        console.log(checkId.rows[0])
        console.log(newDestination.rows[0])
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
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
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

        const destination = await sjpDb.getCompanyDetail({ id: data.id_destination_company });

        const departure = await sjpDb.getCompanyDetail({ id: data.id_new_destination_company });

        const originTruck = await sjpDb.getTruckDetail({ id: data.id_truck });
        const newTruck = await sjpDb.getTruckDetail({ id: data.id_new_truck });

        console.log(originTruck.rows[0])
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
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
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
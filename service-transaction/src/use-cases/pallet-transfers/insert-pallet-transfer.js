const addPalletTransfer = ({ makePalletTransfers, palletTransfersDb, trxNumbersDb, SENDMAIL, PALLET_TRANSFER_TEMPLATE }) => {
    return async function post(info) {
      let data = await makePalletTransfers(info); // entity
  
      console.log(data);

      data = {
        id_company_departure: data.getDeparture(),
        id_company_destination: data.getDestination(),
        id_company_transporter: data.getTransporter(),
        // id_user_checker_sender: data.getSender(),
        id_truck: data.getTruck(),
        id_driver: data.getDriver(),
        status: data.getStatus(),
        reason: data.getReason(),
        note: data.getNote(),
        good_pallet: data.getGoodPallet(),
        tbr_pallet: data.getTbrPallet(),
        ber_pallet: data.getBerPallet(),
        missing_pallet: data.getMissingPallet(),
        createdBy: data.getCreatedBy(),
        updatedBy: data.getUpdatedBy(),
      };

      
  
      // check truck on board 
      const check = await palletTransfersDb.checkTruck({ data });
      if (check.rowCount > 0)
        throw new Error(`This Truck not idle, please check or change truck.`);

      // get TRX NUMBER
      const trxNumber = await palletTransfersDb.getTrxNumber();
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
      data.trx_code = dataTrxNumber.trx_type + '-' + dataTrxNumber.year + dataTrxNumber.month + '-' + FormatedIncrNumber;
      //   insert Pallet Transfer
      const res = await palletTransfersDb.insertNewPalletTransfer({ data });
      console.log(res.dataValues);
      
      // update trxNumber
      const dataUpdateTrxNumber = {
        id: dataTrxNumber.id,
        increment_number: incrNumber ++,
      };
      const trxNumberUpdate = await trxNumbersDb.patchTrxNumber({ dataUpdateTrxNumber });

        // SEND MAIL
        // get data SJP
        const idPalletTransfer = res.dataValues.id;
        const palletTransfer = await palletTransfersDb.selectOne({ id: idPalletTransfer });
        if (palletTransfer.rowCount > 0) {
          const dataPalletTransfer = palletTransfer.rows[0];
          data.departure = dataPalletTransfer.departure_company;
          data.trx_number = data.trx_code;
          data.email_departure = dataPalletTransfer.email_departure;
          data.destination = dataPalletTransfer.destination_company;
          data.email_destination = dataPalletTransfer.email_destination;
          data.truck_number = dataPalletTransfer.license_plate;
          data.driver = dataPalletTransfer.driver_name;
        }


        const mailOptions = {
          from: "no-reply <pms.sig.dev@gmail.com>", // sender address
          to: data.email_destination, // receiver email
          subject: data.trx_number, // Subject line
          text: data.trx_number,
          html: PALLET_TRANSFER_TEMPLATE(data),
        }

        SENDMAIL(mailOptions, (info) => {
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
        });

      // ##
      let msg = `Error on inserting Pallet Transfer, please try again.`;
  
      if (res) {
        msg = `Pallet Transfer has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = addPalletTransfer;
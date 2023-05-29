const selectPalletMovement = ({ palletMovementsDb }) => {
  return async function select() {
    let data = [];

    // select all
    const res = await palletMovementsDb.selectAll({});
    if (res) {
      // only when there is data returned
      const items = res;
      // console.log(items);
      for (let i = 0; i < items.length; i++) {
        const e = items[i].dataValues;
        // const sender = e.user_sender.dataValues;
        // // const receiver = e.user_receiver.dataValues;
        const pallets = e.pallets;
        const sjp = e.sjp.dataValues;
        const departure = sjp.departure_company.dataValues;
        const destination = sjp.destination_company.dataValues;
        const transporter = sjp.transporter_company.dataValues;
        const truck = sjp.truck.dataValues;
        const good = pallets.find(x => x.dataValues.name === 'Good Pallet').dataValues.SjpStatusPallet.dataValues.quantity;
        const tbr = pallets.find(x => x.dataValues.name === 'TBR Pallet').dataValues.SjpStatusPallet.dataValues.quantity;
        const ber = pallets.find(x => x.dataValues.name === 'BER Pallet').dataValues.SjpStatusPallet.dataValues.quantity;
        const missing = pallets.find(x => x.dataValues.name === 'Missing Pallet').dataValues.SjpStatusPallet.dataValues.quantity;
        const total = parseInt(good) + parseInt(tbr) + parseInt(ber) + parseInt(missing)
        // push items to array
        data.push({
          id: e.id,
          trx_number: sjp.trx_number ? sjp.trx_number : null,
          departure: departure.name ? departure.name : null,
          destination: destination.name ? destination.name : null,
          transporter: transporter.name ? transporter.name : null,
          truck: truck.license_plate ? truck.license_plate : null,
          status: e.trx_status ? e.trx_status : 0,
          distribution: e.distribution ? e.distribution : 0,
          good: good ? good : 0,
          tbr: tbr ? tbr : 0,
          ber: ber ? ber : 0,
          missing: missing ? missing : 0,
          total: total ? total : 0,
          eta: sjp.eta ? sjp.eta : null,
          departure_time: sjp.departure_time ? sjp.departure_time : null,
        });
      }
    }
    return data;
  };
};

module.exports = selectPalletMovement;

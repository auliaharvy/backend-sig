const selectSjp = ({ sjpDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id } = info; // deconstruct
      const { from, to } = info;
      console.log(from)
  
      if (id) {
        // select one
        const res = await sjpDb.selectOne({ id });
        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              idDeparture: e.id_departure_company ? e.id_departure_company : null,
              idDestination: e.id_destination_company ? e.id_destination_company : null,
              idTransporter: e.id_transporter_company ? e.id_transporter_company : null,
              idTruck: e.id_truck ? e.id_truck : null,
              idDriver: e.id_driver ? e.id_driver : null,
              secondDriver: e.second_driver ? e.second_driver : null,
              trxNumber: e.trx_number ? e.trx_number : null,
              noDo: e.no_do ? e.no_do : null,
              tonnage: e.tonnage ? e.tonnage : null,
              packaging: e.packaging ? e.packaging : null,
              productQuantity: e.product_quantity ? e.product_quantity : null,
              palletQuantity: e.pallet_quantity ? e.pallet_quantity : null,
              trxStatus: e.trx_status ? e.trx_status : 0,
              distribution: e.distribution ? e.distribution : 0,
              departure: e.departure_company ? e.departure_company : null,
              destination: e.destination_company ? e.destination_company : null,
              transporter: e.transporter_company ? e.transporter_company : null,
              licensePlate: e.license_plate ? e.license_plate : null,
              driverName: e.driver_name ? e.driver_name : null,
              eta: e.eta ? e.eta : null,
              departureTime: e.departure_time ? e.departure_time : null,
              createdAt: e.created_at,
              updatedAt: e.updated_at,
            });
          }
        }
      } else if (from) {
        
        // select all
        const res = await sjpDb.exportAll({from, to});
        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              idDeparture: e.id_departure_company ? e.id_departure_company : null,
              idDestination: e.id_destination_company ? e.id_destination_company : null,
              idTransporter: e.id_transporter_company ? e.id_transporter_company : null,
              idTruck: e.id_truck ? e.id_truck : null,
              idDriver: e.id_driver ? e.id_driver : null,
              secondDriver: e.second_driver ? e.second_driver : null,
              trxNumber: e.trx_number ? e.trx_number : null,
              noDo: e.no_do ? e.no_do : null,
              tonnage: e.tonnage ? e.tonnage : null,
              packaging: e.packaging ? e.packaging : null,
              productQuantity: e.product_quantity ? e.product_quantity : null,
              palletQuantity: e.pallet_quantity ? e.pallet_quantity : null,
              trxStatus: e.trx_status ? e.trx_status : 0,
              distribution: e.distribution ? e.distribution : 0,
              departure: e.departure_company ? e.departure_company : null,
              destination: e.destination_company ? e.destination_company : null,
              transporter: e.transporter_company ? e.transporter_company : null,
              licensePlate: e.license_plate ? e.license_plate : null,
              driverName: e.driver_name ? e.driver_name : null,
              eta: e.eta ? e.eta : null,
              departureTime: e.departure_time ? e.departure_time : null,
              createdAt: e.created_at,
              updatedAt: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await sjpDb.selectAll({});
        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              idDeparture: e.id_departure_company ? e.id_departure_company : null,
              idDestination: e.id_destination_company ? e.id_destination_company : null,
              idTransporter: e.id_transporter_company ? e.id_transporter_company : null,
              idTruck: e.id_truck ? e.id_truck : null,
              idDriver: e.id_driver ? e.id_driver : null,
              secondDriver: e.second_driver ? e.second_driver : null,
              trxNumber: e.trx_number ? e.trx_number : null,
              noDo: e.no_do ? e.no_do : null,
              tonnage: e.tonnage ? e.tonnage : null,
              packaging: e.packaging ? e.packaging : null,
              productQuantity: e.product_quantity ? e.product_quantity : null,
              palletQuantity: e.pallet_quantity ? e.pallet_quantity : null,
              trxStatus: e.trx_status ? e.trx_status : 0,
              distribution: e.distribution ? e.distribution : 0,
              departure: e.departure_company ? e.departure_company : null,
              destination: e.destination_company ? e.destination_company : null,
              transporter: e.transporter_company ? e.transporter_company : null,
              licensePlate: e.license_plate ? e.license_plate : null,
              driverName: e.driver_name ? e.driver_name : null,
              eta: e.eta ? e.eta : null,
              departureTime: e.departure_time ? e.departure_time : null,
              createdAt: e.created_at,
              updatedAt: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectSjp;
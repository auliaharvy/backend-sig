const updateSjp = ({ sjpDb, patchSjps }) => {
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

      console.log(data);
      // check transaction type
      if (data.change_type === 'change_destination') {
        // check id if SJP exist
        const checkId = await sjpDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`SJP doesn't exist, please check.`);

        // update
        const res = await sjpDb.changeDestination({ data });
    
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
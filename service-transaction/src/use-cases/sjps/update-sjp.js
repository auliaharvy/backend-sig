const updateSjp = ({ sjpDb, patchSjps }) => {
    return async function put({ id, ...info }) {
      let data = patchSjps(id, info);

      data = {
        id: data.getId(),
        id_departure_company: data.getDeparture(),
        id_destination_company: data.getDestination(),
        id_transporter_company: data.getTransporter(),
        id_truck: data.getTruck(),
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

      if (data.change_type === 'change_destination') {
        // check id if employee exist
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

      if (data.change_type === 'change_truck') {
        // check id if employee exist
        const checkId = await sjpDb.selectOne({ id: data.id });
        if (checkId.rowCount == 0)
          throw new Error(`SJP doesn't exist, please check.`);

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
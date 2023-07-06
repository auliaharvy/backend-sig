const updatePallet = ({
  palletsDB,
  patchPallets
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchPallets(id, info);

    data = {
      id: data.getId(),
      name: data.getPallet(),
      updated_by: data.getUpdatedBy()
    };

    // check id if pallet exist

    const checkId = await palletsDB.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`Pallet doesn't exist, please check.`);

    // check if pallet exist
    const check = await palletsDB.checkPalletExistUpdate({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Pallets already exist, please check.`);

    // update
    const res = await palletsDB.patchPallet({
      data
    });

    let msg = `Pallets was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Pallets updated successfully.`;
      return msg;
    } else {
      // throw new Error(msg);
      //(checkId);
    }
  };
};

module.exports = updatePallet;
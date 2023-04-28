const addPallet = ({
  makePallets,
  palletsDB
}) => {
  return async function post(info) {
    let data = await makePallets(info); // entity

    data = {
      name: data.getPallet(),
      created_by: data.getCreatedBy()
    };
    // to do checking if name already exist
    const check = await palletsDB.checkPalletExist({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Pallet Type already exist, please check.`);
    //   insert
    const res = await palletsDB.insertPallet({
      data
    });

    // ##
    let msg = `Error on inserting Pallet, please try again.`;

    if (res) {
      msg = `Pallet has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = addPallet;
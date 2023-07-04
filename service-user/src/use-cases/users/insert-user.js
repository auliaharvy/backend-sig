const registerUser = ({ makeUsers, usersDB, bcrypt }) => {
    return async function post(info) {
      let data = await makeUsers(info); // entity
      const password = await bcrypt.hash(data.getPassword(), 10);
    
      data = {
        username: data.getUsername(),
        fullname: data.getFullname(),
        email: data.getEmail(),
        password: password,
        is_sso: data.getSso(),
        nopeg: data.getNopeg(),
      };
      // to do checking if name already exist
      const check = await usersDB.checkNameExist({ data });
      if (check.rowCount > 0)
        throw new Error(`User already exist, please check.`);
      //   insert
      const res = await usersDB.registerUsers({ data });
  
      // ##
      let msg = `Error on inserting User, please try again.`;
  
      if (res) {
        msg = `User has been added successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = registerUser;
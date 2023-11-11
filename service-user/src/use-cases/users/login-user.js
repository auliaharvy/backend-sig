const loginUser = ({ dataloginUsers, usersDB, bcrypt }) => {
    return async function post(info) {
      let data = await dataloginUsers(info); // entity
      data = {
        username: data.getUsername(),
        password: data.getPassword(),
        ip: info.source.ip,
        device: info.source.device,
      };
      // to do checking if name already exist
     
      //   insert
      const res = await usersDB.loginUsers({ data });
      // ##
      let msg = `Error on login User, please try again!`;
  
      if (res) {
        //msg = `User has been added successfully.`;
        return res;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = loginUser;

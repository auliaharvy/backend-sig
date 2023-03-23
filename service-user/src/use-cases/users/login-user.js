const loginUser = ({ dataloginUsers, usersDB, bcrypt }) => {
    return async function post(info) {
      let data = await dataloginUsers(info); // entity
    
      data = {
        email: data.getEmail(),
        password: data.getPassword(),
      };
      // to do checking if name already exist
     
      //   insert
      const res = await usersDB.loginUsers({ data });
  
      // ##
      let msg = `Error on login User, please try again.`;
  
      if (res) {
        //msg = `User has been added successfully.`;
        return res;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = loginUser;
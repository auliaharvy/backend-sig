const dataloginUser = ({ }) => {
    return function make({ username, password } = {}) {
     
      if (username == null) {
        throw new Error("Please enter username.");
      }
      if (password == null) {
        throw new Error("Please enter password.");
      }
      return Object.freeze({
        getUsername: () => username,
        getPassword: () => password,
      });
    };
  };
  
  module.exports = dataloginUser;
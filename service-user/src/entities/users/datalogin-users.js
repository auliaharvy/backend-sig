const dataloginUser = ({ }) => {
    return function make({ email, password } = {}) {
     
      if (email == null) {
        throw new Error("Please enter email.");
      }
      if (password == null) {
        throw new Error("Please enter password.");
      }
      return Object.freeze({
        getEmail: () => email,
        getPassword: () => password,
      });
    };
  };
  
  module.exports = dataloginUser;
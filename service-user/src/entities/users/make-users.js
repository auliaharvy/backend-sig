const makeUser = ({ }) => {
    return function make({ username, fullname, email, password, is_sso, nopeg } = {}) {
      if (!username) {
        throw new Error("Please enter username.");
      }
      if (!fullname) {
        throw new Error("Please enter fullname.");
      }
      if (email == null) {
        throw new Error("Please enter email.");
      }
      if (password == null) {
        throw new Error("Please enter password.");
      }
      return Object.freeze({
        getUsername: () => username,
        getFullname: () => fullname,
        getEmail: () => email,
        getPassword: () => password,
        getSso: () => is_sso,
        getNopeg: () => nopeg,
      });
    };
  };
  
  module.exports = makeUser;
const patchUser = ({}) => {
  return function make(id, {
    username,
    fullname,
    email,
    password,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of user");
    }
    if (!username) {
      throw new Error("Please enter Username.");
    }
    if (!fullname) {
      throw new Error("Please enter Full Name.");
    }
    if (!email) {
      throw new Error("Please enter Email.");
    }
    if (!password) {
      throw new Error("Please enter Password.");
    }
    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getFullname: () => fullname,
      getEmail: () => email,
      getPassword: () => password,
    });
  };
};

module.exports = patchUser;
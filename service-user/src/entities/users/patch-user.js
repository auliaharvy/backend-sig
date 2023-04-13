const patchUser = ({}) => {
  return function make(id, {
    userName,
    fullName,
    email,
    password,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of user");
    }
    if (!userName) {
      throw new Error("Please enter Username.");
    }
    if (!fullName) {
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
      getUsername: () => userName,
      getFullname: () => fullName,
      getEmail: () => email,
      getPassword: () => password,
    });
  };
};

module.exports = patchUser;
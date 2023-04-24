const register = require('./register');
const login = require('./login');
const update = require('./update');
const getUser = require('./getUser');
const getAll = require('./getAll');
const deleteUser = require('./deleteUser');
const logout = require('./logout');

module.exports = {
    register,
    login,
    update,
    getUser,
    getAll,
    deleteUser,
    logout
}
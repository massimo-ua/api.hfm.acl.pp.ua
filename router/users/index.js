'use strict';

const login = require('./login.js');
const logout = require('./logout');
const register = require('./register');
const confirm = require('./confirm');

module.exports = {
    login,
    logout,
    register,
    confirm
};
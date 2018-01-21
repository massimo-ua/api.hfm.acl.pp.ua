'use strict';

const login = require('./login.js');
const logout = require('./logout');
const signup = require('./signup');
const confirm = require('./confirm');

module.exports = {
    login,
    logout,
    signup,
    confirm
};
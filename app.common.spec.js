'use strict';
const request = require('super-request');
const { expect } = require('chai');
const server = require('./app').listen();

module.exports = {
    request,
    expect,
    server
};
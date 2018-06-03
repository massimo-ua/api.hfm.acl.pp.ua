'use strict';
const Sequelize = require('sequelize');
const db = require('../../db');
const bcrypt = require('bcrypt');
const { throwError, to } = require('../../helpers');

const User = db.define('user', {
      _id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
      },
      login: {
        type: Sequelize.STRING(10), allowNull: false
      },
      password: {
        type: Sequelize.STRING(60), allowNull: false
      },
      name: {
        type: Sequelize.STRING(100), allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
      }
    },
    {
      timestamps: false,
      indexes: [
        {
            unique: true,
            fields: ['login']
        }
      ]
    });
    // hook that hashes user password every time before save or update
    User.addHook('beforeSave', 'hashUserPassword', _hashUserPassword);

    async function _hashUserPassword(user) {
      let error, hash;
      if(user.password) {
        [error, hash] = await to(bcrypt.hash(user.password, 5));
        if(error) {
            throwError(error.message, true);
        }
        user.password = hash;
      }
    }
module.exports = User;
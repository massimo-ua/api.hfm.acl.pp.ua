'use strict';
const jsonwebtoken = require('jsonwebtoken'),
      config = require('../config');


function createToken(user) {
    let token;
    return new Promise((resolve, reject) => {
        try {
            token = jsonwebtoken.sign(
                {
                    _id: user._id,
                    login: user.login,
                    name: user.name
                },
                config.jwt.secret,
                {expiresIn: "1d"}
            );
            resolve(token);
        }
        catch (err) {
            reject(err);
        }
    });

}

module.exports = createToken;

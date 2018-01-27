'use strict';
const pe = require('parse-error');
const to = function(promise) {
    return promise
    .then(data => 
        [null, data]
    )
    .catch(err =>
        [pe(err), undefined]
    );
}
module.exports = to;
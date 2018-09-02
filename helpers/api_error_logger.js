const logger = require('../logger');
const apiLogger = (error, ctx) => {
    logger.error('Api Error', { error: error, ctx: ctx });
}

module.exports = apiLogger;
const logger = require('../logger');
const serverLogger = (error) => {
    logger.error('Server Error', { error: error.message });
}

module.exports = serverLogger;
'use strict'
const { promisify } = require('util');
const logger = require('./logger');
const config = require('./config');
const server = require('./app');

const listener = promisify(server.listen).bind(server);

listener(config.app.port)
.then(() => {
    logger.info(`Server listening on port ${config.app.port}`);
})
.catch((err) => {
    logger.error('Error happened during server start', err);
    process.exit(1);
});
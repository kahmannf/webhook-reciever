require('dotenv').load();

module.exports = {
    server_port: process.env.SERVER_PORT,
    log_incoming: process.env.LOG_INCOMMING,
}
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const hookhandler = require('./hookhandler');

const app = express();
const logger = require('logger').createLogger('incomming.log');

logger.format = function (level, date, message) {
    return date.getTime().toString() + ': ' + level + ' '+ message;
};

app.use(bodyParser.json());

app.use(express.static('./public'));


app.post('/recieve', (req, res) => {
    if (config.log_incoming == 1) {
        logger.info(req.rawHeaders);
        logger.info(req.body);
    }
    else {
        res.status(200).send();
        return;
    }
});

app.listen(config.server_port, () => {
    console.log('Server running on port ' + config.server_port);
});
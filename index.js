const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const hookhandler = require('./hookhandlers');

const loggerapi = require('logger');

const app = express();
const consolelogger = loggerapi.createLogger();
const filelogger = loggerapi.createLogger('logs/incomming.log');

app.use(bodyParser.json());

app.use(express.static('./public'));


app.post('/recieve', (req, res) => {
    if (config.log_incoming == 1) {
        consolelogger.log('Incomming POST: ' + (req.header('X-GitHub-Event')));
        if(req.body && req.body.repository){
            filelogger.info('RepoConnect: ID: ' + req.body.repository.id + '; FullName: ' + req.body.repository.full_name);
        }
    }

    hookhandler.handle(req, (err) =>
    {
        if (err) {
            filelogger.error(err);
            filelogger.error(req.rawHeaders);
            filelogger.error(req.body);
        }
        res.status(200).send();
    })
    return;
});

app.listen(config.server_port, () => {
    console.log('Server running on port ' + config.server_port);
});
const actionlogger = require('logger').createLogger('./logs/actions.log');

const execute = function (cmd, args, callBack) {
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args),
        resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() }); // fill resp with data
    child.stdout.on('end', function () { callBack(resp) }); //report data to caller
}

module.exports = {
    action_types: ['command'],
    /** 
    * executes a commandline_command
    * @function
    * @param {Array} params Command parameter. Will be executed by commandline
    */
    command: (params) => {
        try {
            var cmd = params[0];
            var parameter = [];

            if(params.length == 2){
                parameter = [params[1]];
            }
            else if(params.length > 2) {
                parameter = params.shift();
            }


            var run = new execute(cmd, parameter, function (text) { actionlogger.info(text); })
        }
        catch (e) { actionlogger.error(e); }
    }
}
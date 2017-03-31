const fs = require('fs');

const actions = require('../model/actions');

    /** 
    * @param {any} req the HTTP-POST request. will not be answered.
    * @callback matchHookCallback
    */
const match = (req, callback) => {

        fs.readFile('hooks.json', 'utf8', function (err, data) {
            if (err) {
                callback(err, false, undefined);
                return;
            }
            else {
                var hooks = JSON.parse(data);

                if (!hooks) {
                    callback(undefined, false, undefined);
                    return;
                }
                else {

                    var hook = null;

                    if (req.body.repository) { // repohook

                        for (var i = 0; i < hooks.repohooks.length; i++) {

                            if (hooks.repohooks[i].repository_id == req.body.repository.id) {
                                hook = hooks.repohooks[i];
                                break;
                            }
                        }
                    }
                    else {
                        //Todo: implement
                    }

                    if (hook != null) {
                        callback(undefined, true, hook);
                        return;
                    }
                    else {
                        callback(undefined, false, undefined);
                        return;
                    }
                }
            }

        });
 }

    /** 
    * @callback matchHookCallback
    * @param {any} err any error that occured during execution
    * @param {bool} wasSucessful whether a match was found
    * @param {repohook} match match, if a hook was found
    */



module.exports = {
    handle: (req, callback) => {
        try {
            if (!req.body) {
                throw 'No request-body!';
            }

            match(req, (err, wasSucessful, match) => {
                if (err) {
                    callback(err)
                    return;
                }

                if (!wasSucessful) {
                    callback('no hook found');
                    return;
                }
                else {

                    if (!match.action) {
                        callback('No action defined for this hook!');
                        return;
                    }

                    if (!actions[match.action]) {
                        callback('Unknown action: ' + match.action);
                        return;
                    }

                    actions[match.action](match.action_params);
                    callback();
                    return;
                }
            });
        }
        catch (e) {
            callback(e);
            return;
        }
    }
}
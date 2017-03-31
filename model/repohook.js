/**
 * @class
 */
const repohook = function () {
    /** @member {string} id of the repository*/
    this.repository_id = null;
    /** @member {Array} names of all hook-events that will trigger the action */
    this.hookevents = [];
    /** @member {string} name of the action that will be executed when a hook is incomming */
    this.action = null;
    /** @member  {Array} the parameters for the action */
    this.action_params = [];
}
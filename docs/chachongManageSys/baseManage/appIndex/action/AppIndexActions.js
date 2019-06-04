let Reflux = require('reflux');

let AppIndexActions = Reflux.createActions([
    'retrieve',
    'retrieveStatistics',
    'delete',
    'update',
    'create',
    'createDoor'
]);

module.exports = AppIndexActions;
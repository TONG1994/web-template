let Reflux = require('reflux');

let AllOrderActions = Reflux.createActions([
  'retrieve',
  'retrieveByWhere',
])

module.exports = AllOrderActions;
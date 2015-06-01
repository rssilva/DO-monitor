var config = require('./config');

var dropletsHandler = require('../src/DropletsHandler');

dropletsHandler.init(config.token);
dropletsHandler.setOkStatuses(config.okStatuses);
dropletsHandler.setMonitored(config.monitored);

var onDropletData = function (data) {
  console.log(data)
}

dropletsHandler.getData(onDropletData);

setInterval(function () {
  dropletsHandler.getData(onDropletData);
}, 60000);

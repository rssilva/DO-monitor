var config = require('./config');

var DigitalOcean = require('dropletapi').Droplets;

var digitalOcean = new DigitalOcean(config.token);

var dropletsHandler = require('../src/DropletsHandler');

digitalOcean.listDroplets(function (err, result) {
  onDropletsData(result);
})

function onDropletsData (data) {
  if (data) {
    dropletsHandler.onDataUpdate(data)
  }
}

dropletsHandler.setOkStatuses(config.okStatuses);
dropletsHandler.setMonitored(config.monitored);

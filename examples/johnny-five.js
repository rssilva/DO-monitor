var config = require('./config');
var five = require('johnny-five');
var board = new five.Board({ port : 'COM3' });

var dropletsHandler = require('../src/DropletsHandler');

dropletsHandler.init(config.token);
dropletsHandler.setOkStatuses(config.okStatuses);
dropletsHandler.setMonitored(config.monitored);

var onDropletData = function (data, led) {
  if (data.ok && data.ok.length) {
    led.stop();
    led.on();
  }

  if (data.notOk && data.notOk.length) {
    led.stop();
    led.strobe();
  }
}

board.on('ready', function() {
  console.log('starting johnny...');

  var led = new five.Led(13);
  
  dropletsHandler.getData(function (data) {
    onDropletData(data, led);
  });

  setInterval(function () {
    dropletsHandler.getData(function (data) {
    	onDropletData(data, led);
    });
  }, 10000);

  led.strobe();
});

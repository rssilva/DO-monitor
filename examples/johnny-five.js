var config = require('./config');
var five = require('johnny-five');
var board = new five.Board({ port : 'COM3' });

var dropletsHandler = require('../src/DropletsHandler');

var led, piezo, alarmInterval;

dropletsHandler.init(config.token);
dropletsHandler.setOkStatuses(config.okStatuses);
dropletsHandler.setMonitored(config.monitored);

var onDropletData = function (data) {
  if (data.ok && data.ok.length) {
    led.stop();
    led.on();
    stopAlarm();
  }

  if (data.notOk && data.notOk.length) {
    led.stop();
    led.strobe();
    startAlarm();
  }
};

var startRequests = function () {
  getData();

  setInterval(function () {
    getData();
  }, 30000);
};

var getData = function () {
  dropletsHandler.getData(function (data) {
    onDropletData(data);
  });
};

var startAlarm = function () {
  stopAlarm();
  playAlarm();

  alarmInterval = setInterval(function () {
    if (!piezo.isPlaying) {
      playAlarm();
    }
  }, 1000);
};

var playAlarm = function () {
  piezo.play({
    song: "C F D F C F D F C F",
    beats: 1 / 4,
    tempo: 100
  });
};

var stopAlarm = function () {
  clearInterval(alarmInterval);
};

board.on('ready', function() {
  console.log('starting johnny...');

  led = new five.Led(13);
  piezo = new five.Piezo(9);
  
  board.repl.inject({
    piezo: piezo
  });

  startRequests();

  led.stop();
  led.on();
});

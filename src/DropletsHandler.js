var DigitalOcean = require('dropletapi').Droplets;

var DropletsHandler = {
  init: function (token) {
    this.digitalOcean = new DigitalOcean(token);
  },

  getData: function (cb) {
    var that = this;
    var statuses;

    this.digitalOcean.listDroplets(function (err, result) {
      statuses = that.onDataUpdate(result);
      cb(statuses);
    });
  },

  setMonitored: function (monitored) {
    this.monitored = monitored;
  },

  isMonitored: function (name) {
    return this.monitored.indexOf(name) != -1;
  },

  isOk: function (status) {
    return this.okStatuses.indexOf(status) != -1;
  },

  setOkStatuses: function (okStatuses) {
    this.okStatuses = okStatuses;
  },

  onDataUpdate: function (data) {
    if (data && data.droplets) {
      return this.parseDroplets(data.droplets);
    }
  },

  parseDroplets: function (droplets) {
    var ok = [];
    var notOk = [];
    var isOk;

    droplets.forEach(function (droplet) {
      isOk = this.checkDroplet(droplet);

      isOk ? ok.push(droplet) : notOk.push(droplet);
    }.bind(this));

    return {notOk: notOk, ok: ok};
  },

  checkDroplet: function (droplet) {
    var isMonitored = this.isMonitored(droplet.name);
    var isOk = this.isOk(droplet.status);

    var shouldNotify = isMonitored && !isOk;

    return !shouldNotify;
  }

}

module.exports = DropletsHandler;

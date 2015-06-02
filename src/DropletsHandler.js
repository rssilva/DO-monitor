var DigitalOcean = require('dropletapi').Droplets;
var request = require('request');

var DropletsHandler = {
  init: function (token) {
    this.token = token;
    this.monitored = [];
    this.okStatuses = ['active'];

    this.digitalOcean = new DigitalOcean(token);
  },

  /**
   * Get droplets data, parse and executes the callback
   * @param Function - callback to be executed
   */
  getData: function (cb) {

    var options = {
      url: 'https://api.digitalocean.com/v2/droplets/',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
      }
    };

    var onResponse = function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        var statuses = this.parseDroplets(data.droplets);
        cb(statuses);
      }
    }.bind(this);

    request(options, onResponse);
  },

  /**
   * Set the monitored array wich contain the names of the droplets
   *  that will be checked
   */
  setMonitored: function (monitored) {
    this.monitored = monitored;
  },

  /**
   * Set the statuses that are considered ok to the droplets
   */
  setOkStatuses: function (okStatuses) {
    this.okStatuses = okStatuses;
  },

  /**
   * Checks if a specific droplet name is on the monitored array
   */
  isMonitored: function (name) {
    return this.monitored.indexOf(name) != -1;
  },

  /**
   * Checks if the droplet status is between that ones that are considered Ok
   */
  isOk: function (status) {
    return this.okStatuses.indexOf(status) != -1;
  },

  /**
   * Iterates over droplets and pushes to different arrays considering the stabilished
   *  as ok or notOk according defined rules
   */
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

  /**
   * Check droplet name and status to check if should notify or not
   */
  checkDroplet: function (droplet) {
    var isMonitored = this.isMonitored(droplet.name);
    var isOk = this.isOk(droplet.status);

    var shouldNotify = isMonitored && !isOk;

    return !shouldNotify;
  }

}

module.exports = DropletsHandler;

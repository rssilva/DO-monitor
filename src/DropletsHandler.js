var DropletsHandler = {
  init: function () {

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
      this.parseDroplets(data.droplets);
    }
  },

  parseDroplets: function (droplets) {
    var isMonitored;

    droplets.forEach(function (droplet) {
      this.checkDroplet(droplet);
    }.bind(this));
  },

  checkDroplet: function (droplet) {
    var isMonitored = this.isMonitored(droplet.name);
    var isOk = this.isOk(droplet.status);

    if (isMonitored && isOk) {
      this.setToOk(droplet);
    }

    if (isMonitored && !isOk) {
      this.notifyProblem(droplet);
    }
  },

  setToOk: function (droplet) {
    console.log(droplet.name, 'is OK');
  },

  notifyProblem: function (droplet) {

  }
}

module.exports = DropletsHandler;

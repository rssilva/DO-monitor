# Monitoring a Droplet Status

A little experiment to check droplet status and send a notification.

## Usage

```javascript
var dropletsHandler = require('../src/DropletsHandler');

dropletsHandler.init(TOKEN);

/**
 * you can set the statuses that will be considered as Ok
 *  if the monitored droplets has different statuses
 *  will be marked as 'notOk'
 */ 
dropletsHandler.setOkStatuses(['active']);

// which droplets will be monitored
dropletsHandler.setMonitored(['droplet1', 'droplet2']);
```
## Examples

[basic.js](https://github.com/rssilva/DO-monitor/blob/master/examples/basic.js) - a simple example of use  
[johnny-five.js](https://github.com/rssilva/DO-monitor/blob/master/examples/johnny-five.js) - using johnny-five to ring a piezo and blink a led if the status is not ok ([video](https://www.youtube.com/watch?v=xIPqzCI1RK0))

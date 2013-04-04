var cluster = require('cluster');
var crypto = require('crypto');
var os = require('os');
var _ = require('underscore');

if (cluster.isMaster) {

  var workerCount = os.cpus().length;

  // Log output tracker
  var logs = {};

  cluster.on('fork', function(worker) {

    var id = worker.id;
    cluster.workers[id].on('message', function(msg) {

      if (msg.cmd && msg.cmd == 'logMessage') {
        var msgid = JSON.stringify(msg.args);

        if (typeof logs[msgid] == 'undefined') {
          logs[msgid] = 0;
        }
        logs[msgid]++;

        if (logs[msgid] >= workerCount) {
          console.log.apply(this, _.values(msg.args));
        }
      }
    });

  });
} else {
  module.exports = {
    log: function() {
      process.send({
        cmd: 'logMessage',
        args: arguments
      });
    }
  };
}
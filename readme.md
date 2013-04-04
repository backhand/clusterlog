Problem
=======
console.log init messages for clustered apps are printed once per worker.

Solution
========
This simple logger which only outputs a unique line once it's been written by all workers

How 
===
Each work gets a log function to call, which via process.send is conveyed to the master process, which then outputs it once all workers have sent that message. It's simply apply'ed to console.log at the master level, so it works exactly like console.log.

Installation
============
npm install clusterlog

Usage
=====
var clusterlog = require('clusterlog');
clusterlog.log("Some message %s", "which works like console.log does");



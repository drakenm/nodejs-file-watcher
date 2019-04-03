const e = require('events'),
  util = require('util');

const fs = require('fs'),
  watchDirectory = './dir',
  processedDirectory = './done';


class Watcher extends e.EventEmitter {
  constructor(watchDirectory, processedDirectory) {
    super();
    this.watchDirectory = watchDirectory;
    this.processedDirectory = processedDirectory;
  }
}
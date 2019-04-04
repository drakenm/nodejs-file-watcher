const events = require('events'),
  util = require('util');

const fs = require('fs'),
  watchDirectory = './dir',
  processedDirectory = './done';


class Watcher extends events.EventEmitter {

  constructor(watchDirectory, processedDirectory) {
    super();
    this.watchDirectory = watchDirectory;
    this.processedDirectory = processedDirectory;
  }

  watch() {
    const watcher = this;
    fs.readdir(this.watchDirectory, function(err, files) {
      if (err) throw err;
      for (let index in files) {
        watcher.emit('process', files[index]);
      }
    });
  }

  start() {
    var watcher = this;
    fs.watchFile(watchDirectory, function() {
      watcher.watch();
    })
  }
}

let watcher = new Watcher(watchDirectory, processedDirectory);

watcher.on('process', function process(file) {
  const watchFile = this.watchDirectory + '/' + file;
  const processedFile = this.processedDirectory + '/' + file.toLowerCase();
  fs.rename(watchFile, processedFile, function (err) {
    if (err) throw err;
  });
});

watcher.start();
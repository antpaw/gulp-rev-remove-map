'use strict';

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');

var utils = require('./utils');

function plugin(options) {
  return through.obj(function (file, enc, cb) {
    var map;

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-rev-remove-map', 'Streaming not supported'));
      return cb();
    }

    if (path.extname(file.path) === '.json') {
      try {
        map = JSON.parse(file.contents);
      }
      catch (e) {
        this.emit('error', new gutil.PluginError('gulp-rev-remove-map', file.path + ' invalid JSON file'));
        return cb();
      }
      Object.keys(map).forEach(function(key) {
        if (path.extname(map[key]) === '.map') {
          delete map[key];
        }
      });
      // file should be searched for replaces
      file.contents = new Buffer(JSON.stringify(map));
    }

    this.push(file);
    cb();
  });

}

module.exports = plugin;

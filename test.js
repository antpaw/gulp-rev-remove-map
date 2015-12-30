/* global it describe */

'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var path = require('path');

var revRemoveMap = require('./index');
var utils = require('./utils');

var revFileJSON = {
  "bad.js": "bad-edfd8c06c3.js",
  "bad.js.map": "bad-edfd8c06c3.js.map",
  "coffee.js": "coffee-297877c915.js",
  "coffee.js.map": "coffee-297877c915.js.map",
  "foo.js": "foo-8ee0fe424d.js",
  "foo.js.map": "foo-8ee0fe424d.js.map",
  "perf.js": "perf-5bb1fb084c.js",
  "perf.js.map": "perf-5bb1fb084c.js.map",
  "vendor.js": "vendor-9ed0227754.js",
  "vendor.js.map": "vendor-ba89b3f339.js.map"
}


describe('basic removes', function () {
  it('should remove *.map files form manifest files', function (cb) {
    var stream = revRemoveMap();

    stream.on('data', function(file) {
      var map = JSON.parse(file.contents.toString());

      assert.equal(
        map['bad.js.map'],
        undefined
      );
    });
    stream.on('end', function() {
      cb();
    });

    stream.write(new gutil.File({
      path: '/rev-image-manifest.json',
      contents: new Buffer(JSON.stringify(revFileJSON))
    }));

    stream.end();
  });
});

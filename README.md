[gulp](https://github.com/wearefractal/gulp)-rev-remove-map [![Build Status](https://travis-ci.org/antpaw/gulp-rev-remove-map.svg?branch=master)](https://travis-ci.org/antpaw/gulp-rev-remove-map)
================

Rewrite occurrences of filenames which have been renamed by gulp-rev

## Install

```bash
$ npm install --save-dev gulp-rev-remove-map
```


## Usage

After the tasks `gulp-rev` and `gulp-rev-replace` the manifest file still has all the `*.map` files and they are useless.
This task will remove them so you can send smaller manifest files to the user.
It will work with any other tasks that generate a manifest JSON file with key => value concept.


For example, if in your manifest you have:

```js
{
  "bad.js": "bad-edfd8c06c3.js",
  "bad.js.map": "bad-edfd8c06c3.js.map",
  "coffee.js": "coffee-297877c915.js",
  "coffee.js.map": "coffee-297877c915.js.map",
  "foo.css": "foo-8ee0fe424d.css",
  "foo.css.map": "foo-8ee0fe424d.css.map",
  "vendor.js": "vendor-9ed0227754.js",
  "vendor.js.map": "vendor-ba89b3f339.js.map"
}
```

After remove it will look like this:

```js
{
  "bad.js": "bad-edfd8c06c3.js",
  "coffee.js": "coffee-297877c915.js",
  "foo.css": "foo-8ee0fe424d.css",
  "vendor.js": "vendor-9ed0227754.js",
}
```

It is also possible to use gulp-rev-remove-map without gulp-useref:

```js
var rev = require('gulp-rev');
var revRemoveMap = require('gulp-rev-remove-map');
gulp.task('clean_manifest', ['rev tasks...'], function(){
  return gulp.src(['dist/rev-manifest.json'])
    .pipe(revRemoveMap())
    .pipe('dist/');
});
```


## API

### revRemoveMap()

No API. It just works :)

## License

[MIT](http://opensource.org/licenses/MIT) © [Anton Pawlik](http://antpaw.org)

# react-jadeify [![NPM version](https://badge.fury.io/js/react-jadeify.svg)](http://badge.fury.io/js/react-jadeify)
> A Browserify Transform for [react-jade](https://github.com/ForbesLindesay/react-jade).

## Install

```bash
$ npm install --save-dev react-jadeify
```

## Usage
Must use .rjade extention because some people (include me) want to use .jade extention for jade or jadeify.

### gulp
``` coffee
gulp = require 'gulp'
browserify = require 'browserify'

gulp.task 'browserify', ->
  browserify
    entries: ["./src/app.coffee"]
    extensions: ['.coffee', '.rjade']
    transform: ['coffeeify', 'react-jadeify']
  .bundle()
  .pipe gulp.dest('./build')
```

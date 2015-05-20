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
source = require 'vinyl-source-stream'

gulp.task 'browserify', ->
  browserify
    entries: ['./src/app.coffee']
    extensions: ['.coffee', '.rjade']
    transform: ['coffeeify', 'react-jadeify']
  .bundle()
  .pipe source 'app.js'
  .pipe gulp.dest './build'
```

### app.coffee
``` coffee
React = require 'react'
template = require './templates/hello' # hello.rjade

reactElement = template data: 'hello react-jadeify world'
React.render reactElement, document.body

```

### hello.rjade
``` jade
h1= data

```

### index.jade
``` jade
doctype html
html
  head
    title hello react-jadeify
  body
    script(src="./app.js")

```

## A Little Bit More Practical Example

### app.coffee
``` coffee
'use strict'
React = require 'react'

initTemplate = require './templates/init' # init.rjade
rootTemplate = require './templates/root' # root.rjade

RootCompornent = React.createClass
  getInitialState: -> 'data': 'hello'
  render: rootTemplate.locals localData: 'react-jadeify'

React.render initTemplate(InitCompornent: RootCompornent, data: 'world'), document.body

```

### init.rjade
``` jade
InitCompornent(data=data)

```

### root.rjade
``` jade
h1 #{this.state.data} #{localData} #{this.props.data}

```

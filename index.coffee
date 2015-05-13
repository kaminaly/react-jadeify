'use strict'
# require 'coffee-script'
through = require 'through'
jade = require 'react-jade'

module.exports = (file, opt)->
    return through() if !/\.rjade$/i.test file
    input = ''
    write = (chunk)-> input += chunk
    end = ->
        #template = jade.compileClient input
        template = jade.compile input, filename: file
        output = """
            var React = require('react');
            module.exports = #{template.toString()};
            module.exports.locals = #{template.locals.toString()};
        """
        @queue output 
        @queue null
    through write, end

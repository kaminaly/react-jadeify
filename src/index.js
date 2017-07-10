import through from 'through'
import jade from 'react-jade'

module.exports = (file, opt = {})=> {
  let ext = opt.extensions ? opt.extensions : ['.react.jade', '.rjade']
  if(ext.join) ext = ext.join('|')
  ext = ext.replace('.', '\\.')

  const re = new RegExp('(' + ext + ')$', 'i')
  if(!re.test(file)) {
    return through()
  }

  let input = ''
  function write(chunk) {
    input += chunk
  }
  function end() {
    let template

    try {
      template = jade.compile(input, {filename: file})
      this.queue(```
        var React = require('react');
        module.exports = ${template.toString()};
        module.exports.locals = ${template.locals.toString()};
      ```)
      this.queue(null)
    } catch (err) {
      err.stack = ''
      this.emit('error', err)
    }
  }

  return through(write, end)
}

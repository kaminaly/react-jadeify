'use strict';

var _templateObject = _taggedTemplateLiteral([''], ['']),
    _templateObject2 = _taggedTemplateLiteral(['\n        var React = require(\'react\');\n        module.exports = ', ';\n        module.exports.locals = ', ';\n      '], ['\n        var React = require(\'react\');\n        module.exports = ', ';\n        module.exports.locals = ', ';\n      ']);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _reactJade = require('react-jade');

var _reactJade2 = _interopRequireDefault(_reactJade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (file) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var ext = opt.extensions ? opt.extensions : ['.react.jade', '.rjade'];
  if (ext.join) ext = ext.join('|');
  ext = ext.replace('.', '\\.');

  var re = new RegExp('(' + ext + ')$', 'i');
  if (!re.test(file)) {
    return (0, _through2.default)();
  }

  var input = '';
  function write(chunk) {
    input += chunk;
  }
  function end() {
    var template = void 0;

    try {
      template = _reactJade2.default.compile(input, { filename: file });
      this.queue(''(_templateObject2, template.toString(), template.locals.toString())(_templateObject));
      this.queue(null);
    } catch (err) {
      err.stack = '';
      this.emit('error', err);
    }
  }

  return (0, _through2.default)(write, end);
};
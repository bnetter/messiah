var _ = require('lodash');

var isString = function(value, options, context, next) {
  return next(_.isString(value));
};

module.exports = isString;
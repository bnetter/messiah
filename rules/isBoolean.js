var _ = require('lodash');

var isBoolean = function(value, options, context, next) {
  return next(_.isBoolean(value));
};

module.exports = isBoolean;
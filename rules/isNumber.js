var _ = require('lodash');

var isNumber = function(value, options, context, next) {
  return next(_.isNumber(value));
};

module.exports = isNumber;
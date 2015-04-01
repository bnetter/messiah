var _ = require('lodash');

var isArray = function(value, options, context, next) {
  return next(_.isArray(value));
};

module.exports = isArray;
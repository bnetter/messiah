var _ = require('lodash');

var isDate = function(value, options, context, next) {
  return next(_.isDate(value));
};

module.exports = isDate;
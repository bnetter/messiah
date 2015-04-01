var validator = require('validator');

/**
 * Options : `str` to compare with value
 */

var contains = function(value, options, context, next) {
  return next(validator.contains(value, options.str));
};

module.exports = contains;
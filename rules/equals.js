var validator = require('validator');

/**
 * Options : `str` to compare with value
 */

var equals = function(value, options, context, next) {
  return next(validator.equals(value, options.str));
};

module.exports = equals;
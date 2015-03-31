var validator = require('validator');

/**
 * Options : `min` and `max`
 */

var isLength = function(value, options, context, next) {
  return next(validator.isLength(value, options.min, options.max));
};

module.exports = isLength;
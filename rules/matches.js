var validator = require('validator');

/**
 * Options : `pattern` to compare with value
 */

var matches = function(value, options, context, next) {
  return next(validator.matches(value, options.str));
};

module.exports = matches;
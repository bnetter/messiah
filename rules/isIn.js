var validator = require('validator');

var isIn = function(value, options, context, next) {
  return next(validator.isIn(value, options.arr));
};

module.exports = isIn;
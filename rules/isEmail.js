var validator = require('validator');

var isEmail = function(value, options, context, next) {
  return next(validator.isEmail(value));
};

module.exports = isEmail;
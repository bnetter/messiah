var validator = require('validator');

var isURL = function(value, options, context, next) {
  return next(validator.isURL(value));
};

module.exports = isURL;
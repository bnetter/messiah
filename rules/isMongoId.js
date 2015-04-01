var validator = require('validator');

var isMongoId = function(value, options, context, next) {
  return next(validator.isMongoId(value));
};

module.exports = isMongoId;